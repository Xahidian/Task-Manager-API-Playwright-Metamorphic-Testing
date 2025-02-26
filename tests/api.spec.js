import { test, expect, request } from '@playwright/test';

// Base URL of your API
const BASE_URL = 'http://localhost:5000/api/tasks';

test.describe('Task Manager API Tests', () => {

    // MR1: Additive Property (Adding a Task Increases Count)
 // MR1: Additive Property (Adding a Task Increases Count)
test('MR1: Adding a task increases count', async ({ request }) => {
    // Get initial task count
    const response1 = await request.get(BASE_URL);
    const tasksBefore = await response1.json();

    // Add a new task
    const createResponse = await request.post(BASE_URL, {
        data: { title: "Metamorphic Test Task", description: "Test", status: "Pending", dueDate: "2025-02-20T23:59:59.000Z", priority: "High", completed: false }
    });

    console.log("Create Task Response Status:", createResponse.status());
    console.log("Create Task Response Body:", await createResponse.json());

    // Fetch new task count
    const response2 = await request.get(BASE_URL);
    const tasksAfter = await response2.json();

    // Check that count increased
    expect(tasksAfter.length).toBe(tasksBefore.length + 1);
});


    // MR2: Deletion Property (Deleting a Task Decreases Count)
   // MR2: Deletion Property (Deleting a Task Decreases Count)
test('MR2: Deleting a task decreases count', async ({ request }) => {
    // Get initial task count
    const response1 = await request.get(BASE_URL);
    const tasksBefore = await response1.json();

    if (tasksBefore.length === 0) throw new Error("No tasks available to delete");

    // Delete the first task
    const taskId = tasksBefore[0]._id;
    const deleteResponse = await request.delete(`${BASE_URL}/${taskId}`);

    console.log("Delete Task Response Status:", deleteResponse.status());

    // Get new task count
    const response2 = await request.get(BASE_URL);
    const tasksAfter = await response2.json();

    // Check that count decreased
    expect(tasksAfter.length).toBe(tasksBefore.length - 1);
});


    // MR3: Idempotency of Deletion (Deleting the Same Task Twice)
    test('MR3: Deleting a task twice should return 404', async ({ request }) => {
        // Create a temporary task for testing
        const newTask = { title: "Temp Task", description: "Test", status: "Pending", dueDate: "2025-02-20T23:59:59.000Z", priority: "High", completed: false };
        const createdTask = await request.post(BASE_URL, { data: newTask });
        const taskId = (await createdTask.json())._id;

        // Delete the task once
        await request.delete(`${BASE_URL}/${taskId}`);

        // Try deleting the task again (should return 404)
        const response = await request.delete(`${BASE_URL}/${taskId}`);

        expect(response.status()).toBe(404);
    });

    // MR4: Update Consistency (Updated Task Should Reflect Changes)
    test('MR4: Updating a task should reflect changes', async ({ request }) => {
        // Fetch existing tasks
        const response1 = await request.get(BASE_URL);
        const tasks = await response1.json();

        if (tasks.length === 0) throw new Error("No tasks available to update");

        // Select a task with a known valid ID from the response
        const taskId = tasks.find(task => task._id)?.["_id"];

        if (!taskId) throw new Error("No valid task ID found");

        console.log("Using Task ID for Update:", taskId);

        const updatedTask = {
            title: "Updated Task Title",
            description: "Updated Description",
            status: "Completed",
            dueDate: "2025-02-25T23:59:59.000Z",
            priority: "Low",
            completed: true
        };

        const updateResponse = await request.put(`${BASE_URL}/${taskId}`, { data: updatedTask });
        console.log("Update Response Status:", updateResponse.status());

        // Fetch the task again
        const response2 = await request.get(`${BASE_URL}/${taskId}`);

        console.log("Response Status:", response2.status());
        console.log("Response Headers:", response2.headers());
        console.log("Raw Response:", await response2.text());

        expect(response2.status()).toBe(200);
        expect(response2.headers()['content-type']).toContain('application/json');

        const taskAfterUpdate = await response2.json();
        expect(taskAfterUpdate.title).toBe(updatedTask.title);
        expect(taskAfterUpdate.completed).toBe(updatedTask.completed);
    });

    // Test 1: Fetch all tasks
    test('GET /api/tasks - should return all tasks', async ({ request }) => {
        const response = await request.get(BASE_URL);
        expect(response.status()).toBe(200);
        const tasks = await response.json();
        expect(Array.isArray(tasks)).toBeTruthy();
    });

    // Test 2: Create a new task
    test('POST /api/tasks - should create a new task', async ({ request }) => {
        const newTask = {
            title: "Test Task",
            description: "This is a test",
            status: "Pending",
            dueDate: "2025-02-20T23:59:59.000Z",
            priority: "High",
            completed: false
        };

        const response = await request.post(BASE_URL, {
            data: newTask
        });

        expect(response.status()).toBe(201);
        const task = await response.json();
        expect(task.title).toBe(newTask.title);
        expect(task.completed).toBe(false);
    });

    // Test 3: Update a task
    test('PUT /api/tasks/:id - should update an existing task', async ({ request }) => {
        const updatedTask = {
            title: "Updated Task",
            description: "Updated description",
            status: "In Progress",
            dueDate: "2025-02-22T23:59:59.000Z",
            priority: "Medium",
            completed: true
        };

        // Assume we update the first available task
        const tasksResponse = await request.get(BASE_URL);
        const tasks = await tasksResponse.json();
        const taskId = tasks[0]?._id; // Get first task ID

        if (!taskId) throw new Error("No tasks available to update");

        const response = await request.put(`${BASE_URL}/${taskId}`, {
            data: updatedTask
        });

        expect(response.status()).toBe(200);
        const task = await response.json();
        expect(task.title).toBe(updatedTask.title);
        expect(task.completed).toBe(true);
    });

    // Test 4: Delete a task
    test('DELETE /api/tasks/:id - should delete an existing task', async ({ request }) => {
        // Get all tasks first
        const tasksResponse = await request.get(BASE_URL);
        const tasks = await tasksResponse.json();
        const taskId = tasks[0]?._id; // Get first task ID

        if (!taskId) throw new Error("No tasks available to delete");

        const response = await request.delete(`${BASE_URL}/${taskId}`);

        expect(response.status()).toBe(204); // No Content response expected
    });

});
