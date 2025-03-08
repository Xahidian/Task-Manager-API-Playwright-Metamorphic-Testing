// @ts-nocheck
import { test, expect, request } from '@playwright/test';

// Base URL of your API
const BASE_URL = 'http://localhost:5000/api/tasks';

let createdTaskId; // Global variable to store a created task ID

test.describe('Task Manager API Tests', () => {

    // ✅ Before each test that needs an existing task, create one
    test.beforeEach(async ({ request }) => {
        const newTask = {
            title: "Pre-existing Test Task",
            description: "A task created before each test",
            status: "Pending",
            dueDate: "2025-12-31T23:59:59.000Z",
            priority: "High",
            completed: false
        };
        const response = await request.post(BASE_URL, { data: newTask });
        createdTaskId = (await response.json())._id;
    });

    /**
     * ✅ MR1: Additive Property (Adding a Task Increases Count)
     * When a task is added, the total count should increase.
     */
    test('MR1: Adding a task increases count', async ({ request }) => {
        const response1 = await request.get(BASE_URL);
        const tasksBefore = await response1.json();
        console.log("🔍 Initial Task Count:", tasksBefore.length);
    
        const createResponse = await request.post(BASE_URL, {
            data: { 
                title: "Metamorphic Test Task", 
                description: "Test", 
                status: "Pending", 
                dueDate: "2025-02-20T23:59:59.000Z", 
                priority: "High", 
                completed: false 
            }
        });

        expect(createResponse.status()).toBe(201);
        const createdTask = await createResponse.json();
        expect(createdTask).toHaveProperty("_id");
    
        // 🔥 Wait for DB to update
        await new Promise(res => setTimeout(res, 1500));

        const response2 = await request.get(BASE_URL);
        const tasksAfter = await response2.json();
        console.log("🔍 Updated Task Count:", tasksAfter.length);
    
        expect(tasksAfter.length).toBe(tasksBefore.length + 1);
    });

    /**
     * ✅ MR2: Deletion Property (Deleting a Task Decreases Count)
     */
    test('MR2: Deleting a task decreases count', async ({ request }) => {
        const createResponse = await request.post(BASE_URL, {
            data: { 
                title: "Temp Delete Task", 
                description: "Test", 
                status: "Pending", 
                dueDate: "2025-02-20T23:59:59.000Z", 
                priority: "High", 
                completed: false 
            }
        });

        expect(createResponse.status()).toBe(201);
        const taskId = (await createResponse.json())._id;

        const response1 = await request.get(BASE_URL);
        const tasksBefore = await response1.json();

        const deleteResponse = await request.delete(`${BASE_URL}/${taskId}`);
        expect(deleteResponse.status()).toBe(204);

        // 🔥 Wait for DB update
        await new Promise(res => setTimeout(res, 1500));

        const response2 = await request.get(BASE_URL);
        const tasksAfter = await response2.json();

        expect(tasksAfter.length).toBe(tasksBefore.length - 1);
    });

    /**
     * ✅ MR3: Idempotency of Deletion
     */
    test('MR3: Deleting a task twice should return 404', async ({ request }) => {
        const newTask = { title: "Temp Task", description: "Test", status: "Pending", dueDate: "2025-02-20T23:59:59.000Z", priority: "High", completed: false };
        const createdTask = await request.post(BASE_URL, { data: newTask });
        const taskId = (await createdTask.json())._id;

        await request.delete(`${BASE_URL}/${taskId}`);
        const response = await request.delete(`${BASE_URL}/${taskId}`);

        expect(response.status()).toBe(404);
    });

    /**
     * ✅ MR4: Update Consistency
     */
    test('MR4: Updating a task should reflect changes', async ({ request }) => {
        if (!createdTaskId) throw new Error("No valid task ID found");

        const updatedTask = {
            title: "Updated Task Title",
            description: "Updated Description",
            status: "Completed",
            dueDate: "2025-02-25T23:59:59.000Z",
            priority: "Low",
            completed: true
        };

        const updateResponse = await request.put(`${BASE_URL}/${createdTaskId}`, { data: updatedTask });
        expect(updateResponse.status()).toBe(200);

        const response2 = await request.get(`${BASE_URL}/${createdTaskId}`);
        const taskAfterUpdate = await response2.json();

        expect(taskAfterUpdate.title).toBe(updatedTask.title);
        expect(taskAfterUpdate.completed).toBe(updatedTask.completed);
    });

    /**
     * ✅ Basic API Functional Tests
     */
    test('GET /api/tasks - should return all tasks', async ({ request }) => {
        const response = await request.get(BASE_URL);
        expect(response.status()).toBe(200);
        const tasks = await response.json();
        expect(Array.isArray(tasks)).toBeTruthy();
    });

    test('POST /api/tasks - should create a new task', async ({ request }) => {
        const newTask = { title: "Test Task", description: "This is a test", status: "Pending", dueDate: "2025-02-20T23:59:59.000Z", priority: "High", completed: false };
        const response = await request.post(BASE_URL, { data: newTask });

        expect(response.status()).toBe(201);
        const task = await response.json();
        expect(task.title).toBe(newTask.title);
    });

    test('should return 404 for non-existing task', async ({ request }) => {
        const response = await request.get('/api/tasks/610c36c9a9231f00158e4e91');
        expect(response.status()).toBe(404);
    });

    test('should delete a task', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/${createdTaskId}`);
        expect(response.status()).toBe(204);

        const checkResponse = await request.get(`${BASE_URL}/${createdTaskId}`);
        expect(checkResponse.status()).toBe(404);
    });

    /**
     * ✅ Negative Tests (Validation Errors)
     */
    test('should return 400 if title is missing', async ({ request }) => {
        const response = await request.post(BASE_URL, { data: {} });
        expect(response.status()).toBe(400);
    });

    test('should return 400 if dueDate is invalid', async ({ request }) => {
        const response = await request.post(BASE_URL, { data: { title: "Test Task", dueDate: "invalid" } });
        expect(response.status()).toBe(400);
    });

    test('should return 400 if Task.create() fails', async ({ request }) => {
        const invalidTask = { title: null, dueDate: "InvalidDate" };
        const response = await request.post(BASE_URL, { data: invalidTask });

        const responseBody = await response.json();
        console.log("Create Task Failure Response:", responseBody);

        expect(response.status()).toBe(400);
        expect(responseBody.error).toBe("Title is required and must be a string");
    });
});
