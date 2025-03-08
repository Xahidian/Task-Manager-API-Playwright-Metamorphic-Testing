// @ts-nocheck
// 
import { test, expect, request } from '@playwright/test';

// Base URL of your API
const BASE_URL = 'http://localhost:5000/api/tasks';

let createdTaskId; // Global variable to store a created task ID

test.describe('Task Manager API Tests', () => {

    // ✅ Before each test, create a unique task
    test.beforeEach(async ({ request }) => {
        const newTask = {
            title: `Pre-existing Test Task ${Date.now()}`,  // Ensure unique title
            description: "A task created before each test",
            status: "Pending",
            dueDate: "2025-12-31T23:59:59.000Z",
            priority: "High",
            completed: false
        };
        const response = await request.post(BASE_URL, { data: newTask });

        if (response.status() !== 201) {
            throw new Error(`Task creation failed: ${await response.text()}`);
        }

        createdTaskId = (await response.json())._id;
    });

    /**
     * ✅ MR1: Additive Property (Adding a Task Increases Count)
     */
    test('MR1: Adding a task increases count', async ({ request }) => {
        const response1 = await request.get(BASE_URL);
        const tasksBefore = await response1.json();

        const createResponse = await request.post(BASE_URL, {
            data: { title: `Metamorphic Test Task ${Date.now()}`, description: "Test", status: "Pending", dueDate: "2025-02-20T23:59:59.000Z", priority: "High", completed: false }
        });

        expect(createResponse.status()).toBe(201);
        await new Promise(res => setTimeout(res, 2000));

        const response2 = await request.get(BASE_URL);
        const tasksAfter = await response2.json();

        expect(tasksAfter.length).toBe(tasksBefore.length + 1);
    });

    /**
     * ✅ MR2: Deletion Property (Deleting a Task Decreases Count)
     */
    test('MR2: Deleting a task decreases count', async ({ request }) => {
        if (!createdTaskId) throw new Error("No valid task ID found for deletion.");

        const response1 = await request.get(BASE_URL);
        const tasksBefore = await response1.json();

        const deleteResponse = await request.delete(`${BASE_URL}/${createdTaskId}`);
        expect(deleteResponse.status()).toBe(204);
        await new Promise(res => setTimeout(res, 2000));

        const response2 = await request.get(BASE_URL);
        const tasksAfter = await response2.json();

        expect(tasksAfter.length).toBe(tasksBefore.length - 1);
    });

    /**
     * ✅ MR3: Idempotency of Deletion
     */
    test('MR3: Deleting a task twice should return 404', async ({ request }) => {
        if (!createdTaskId) throw new Error("No valid task ID found for deletion.");

        const firstDeleteResponse = await request.delete(`${BASE_URL}/${createdTaskId}`);
        expect(firstDeleteResponse.status()).toBe(204);

        const secondDeleteResponse = await request.delete(`${BASE_URL}/${createdTaskId}`);
        expect(secondDeleteResponse.status()).toBe(404);
    });

    /**
     * ✅ MR4: Update Consistency
     */
    test('MR4: Updating a task should reflect changes', async ({ request }) => {
        if (!createdTaskId) throw new Error("No valid task ID found for update.");

        const updatedTask = {
            title: `Updated Task Title ${Date.now()}`,  // Ensure unique title
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
 * ✅ MR5: Order of tasks should remain unchanged if no modifications occur
 */
test('MR5: Order of tasks should remain unchanged if no modifications occur', async ({ request }) => {
    const response1 = await request.get(BASE_URL);
    const tasksBefore = await response1.json();

    // Ensure `createdAt` exists and sort safely
    const sortedTasksBefore = tasksBefore.sort((a, b) => 
        (a.createdAt || "").localeCompare(b.createdAt || "")
    );

    await new Promise(res => setTimeout(res, 2000));
    const response2 = await request.get(BASE_URL);
    const tasksAfter = await response2.json();

    const sortedTasksAfter = tasksAfter.sort((a, b) => 
        (a.createdAt || "").localeCompare(b.createdAt || "")
    );

    // ✅ Validate task order is unchanged
    expect(sortedTasksAfter).toEqual(sortedTasksBefore);
});


    /**
     * ✅ MR6: Duplicate Handling
     */
    test('MR6: Adding the same task twice should not create an exact duplicate', async ({ request }) => {
        const duplicateTask = { title: `Duplicate Test Task ${Date.now()}`, description: "Testing duplicate handling", status: "Pending", dueDate: "2025-12-31T23:59:59.000Z", priority: "High", completed: false };

        const response1 = await request.post(BASE_URL, { data: duplicateTask });
        expect(response1.status()).toBe(201);

        const response2 = await request.post(BASE_URL, { data: duplicateTask });
        expect(response2.status()).toBe(400);
    });

    /**
     * ✅ MR7: Bulk Addition Consistency
     */
    test('MR7: Adding multiple tasks should increase the count accordingly', async ({ request }) => {
        const response1 = await request.get(BASE_URL);
        const tasksBefore = await response1.json();

        for (let i = 0; i < 3; i++) {
            await request.post(BASE_URL, { data: { title: `Bulk Task ${Date.now()} ${i}`, description: "Test", status: "Pending", dueDate: "2025-02-20", priority: "Medium", completed: false } });
        }

        await new Promise(res => setTimeout(res, 2000));
        const response2 = await request.get(BASE_URL);
        const tasksAfter = await response2.json();

        expect(tasksAfter.length).toBe(tasksBefore.length + 3);
    });

    /**
     * ✅ MR8: Bulk Deletion Consistency
     */
    test('MR8: Deleting multiple tasks should decrease the count accordingly', async ({ request }) => {
        const createdTasks = [];
        for (let i = 0; i < 2; i++) {
            const response = await request.post(BASE_URL, { data: { title: `Delete Task ${Date.now()} ${i}`, description: "Test", status: "Pending", dueDate: "2025-02-20", priority: "Low", completed: false } });
            createdTasks.push((await response.json())._id);
        }

        const response1 = await request.get(BASE_URL);
        const tasksBefore = await response1.json();

        for (const taskId of createdTasks) {
            await request.delete(`${BASE_URL}/${taskId}`);
        }

        await new Promise(res => setTimeout(res, 2000));
        const response2 = await request.get(BASE_URL);
        const tasksAfter = await response2.json();

        expect(tasksAfter.length).toBe(tasksBefore.length - 2);
    });

});
