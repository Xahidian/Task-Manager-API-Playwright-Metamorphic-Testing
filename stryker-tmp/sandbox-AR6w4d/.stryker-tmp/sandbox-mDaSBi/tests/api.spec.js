// @ts-nocheck
// 
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
     * ✅ MR1: Adding a Task Increases Count
     */
    test('MR1: Adding a task increases count', async ({ request }) => {
        const response1 = await request.get(BASE_URL);
        const tasksBefore = await response1.json();

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

        await new Promise(res => setTimeout(res, 1500));

        const response2 = await request.get(BASE_URL);
        const tasksAfter = await response2.json();

        expect(tasksAfter.length).toBe(tasksBefore.length + 1);
    });

    /**
     * ✅ MR2: Deleting a Task Decreases Count
     */
    test('MR2: Deleting a task decreases count', async ({ request }) => {
        const deleteResponse = await request.delete(`${BASE_URL}/${createdTaskId}`);
        expect(deleteResponse.status()).toBe(204);

        await new Promise(res => setTimeout(res, 1500));

        const response = await request.get(`${BASE_URL}/${createdTaskId}`);
        expect(response.status()).toBe(404);
    });

    /**
     * ✅ ID Validation Tests
     */
    test('should return 400 for invalid task ID', async ({ request }) => {
        const invalidIDs = ['invalid-id', '123', 'abc', ''];
        for (const id of invalidIDs) {
            const response = await request.get(`${BASE_URL}/${id}`);
            expect(response.status()).toBe(400);
            const body = await response.json();
            expect(body.error).toBe("Invalid task ID format");
        }
    });

    test('should return 404 for non-existing task', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/610c36c9a9231f00158e4e91`);
        expect(response.status()).toBe(404);
        const body = await response.json();
        expect(body.error).toBe("Task not found");
    });

    /**
     * ✅ MR3: Idempotency of Deletion
     */
    test('MR3: Deleting a task twice should return 404', async ({ request }) => {
        await request.delete(`${BASE_URL}/${createdTaskId}`);
        const response = await request.delete(`${BASE_URL}/${createdTaskId}`);

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
        expect(taskAfterUpdate.description).toBe(updatedTask.description);
        expect(taskAfterUpdate.status).toBe(updatedTask.status);
        expect(taskAfterUpdate.completed).toBe(updatedTask.completed);
        expect(taskAfterUpdate.priority).toBe("Low");
        expect(taskAfterUpdate.dueDate).toBe("2025-02-25T23:59:59.000Z");
    });

    /**
     * ✅ Negative Tests (Validation Errors)
     */
    test('should return 400 if title is missing or invalid', async ({ request }) => {
        const invalidTitles = [null, "", 123, {}, []];

        for (const title of invalidTitles) {
            const response = await request.post(BASE_URL, { data: { title } });
            expect(response.status()).toBe(400);
            const body = await response.json();
            expect(body.error).toBe("Title is required and must be a string");
        }
    });

    test('should return 400 if dueDate is invalid', async ({ request }) => {
        const invalidDates = ["invalid-date", "2025-02-30T23:59:59.000Z", 12345, {}, []];

        for (const dueDate of invalidDates) {
            const response = await request.post(BASE_URL, { data: { title: "Test Task", dueDate } });
            expect(response.status()).toBe(400);
            const body = await response.json();
            expect(body.error).toBe("Invalid due date format");
        }
    });

    /**
     * ✅ Error Handling & Exception Tests
     */
    test('should return 400 for delete operation with invalid ID', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/invalid-id`);
        expect(response.status()).toBe(400);
    });

    test('should return 500 if Task.create() fails', async ({ request }) => {
        const invalidTask = { title: null, dueDate: "InvalidDate" };
        const response = await request.post(BASE_URL, { data: invalidTask });

        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody.error).toBe("Title is required and must be a string");
    });

});
