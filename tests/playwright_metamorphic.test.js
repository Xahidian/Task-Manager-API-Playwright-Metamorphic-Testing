import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://localhost:5000/api/tasks';
let createdTaskId1, createdTaskId2; // Store multiple task IDs

test.describe('Comprehensive Playwright API Tests with Metamorphic Testing', () => {

    /**
     * ✅ Before each test: Create two tasks for testing.
     */
    test.beforeEach(async ({ request }) => {
        const task1 = {
            title: `Task 1 - ${Date.now()}`,
            description: "Task for testing",
            dueDate: "2025-12-31T23:59:59.000Z",
            priority: "Medium",
            completed: false
        };

        const task2 = {
            title: `Task 2 - ${Date.now()}`,
            description: "Another task for testing",
            dueDate: "2025-12-31T23:59:59.000Z",
            priority: "High",
            completed: false
        };

        const response1 = await request.post(BASE_URL, { data: task1 });
        createdTaskId1 = (await response1.json())._id;
        expect(response1.status()).toBe(201);

        const response2 = await request.post(BASE_URL, { data: task2 });
        createdTaskId2 = (await response2.json())._id;
        expect(response2.status()).toBe(201);
    });

    /**
     * ✅ Cleanup after each test: Delete all created tasks.
     */
    test.afterEach(async ({ request }) => {
        if (createdTaskId1) {
            await request.delete(`${BASE_URL}/${createdTaskId1}`);
        }
        if (createdTaskId2) {
            await request.delete(`${BASE_URL}/${createdTaskId2}`);
        }
    });

    /**
     * ✅ Standard Playwright API Tests (from your original test cases)
     */
    test('GET /api/tasks - should return all tasks', async ({ request }) => {
        const response = await request.get(BASE_URL);
        expect(response.status()).toBe(200);
        const tasks = await response.json();
        expect(Array.isArray(tasks)).toBeTruthy();
        expect(tasks.length).toBeGreaterThan(0);
    });

    test('POST /api/tasks - should create a new task', async ({ request }) => {
        const uniqueTitle = `New Task ${Date.now()}`;
        const newTask = { title: uniqueTitle, priority: "High", completed: false };

        const response = await request.post(BASE_URL, { data: newTask });
        const responseBody = await response.json();
        expect(response.status()).toBe(201);
        expect(responseBody.title).toBe(uniqueTitle);
    });

    test('PUT /api/tasks/:id - should update a task', async ({ request }) => {
        const updatedTask = { title: "Updated Task Title", completed: true };

        const updateResponse = await request.put(`${BASE_URL}/${createdTaskId1}`, { data: updatedTask });
        expect(updateResponse.status()).toBe(200);

        const getResponse = await request.get(`${BASE_URL}/${createdTaskId1}`);
        const taskAfterUpdate = await getResponse.json();

        expect(taskAfterUpdate.title).toBe(updatedTask.title);
        expect(taskAfterUpdate.completed).toBe(true);
    });

    test('DELETE /api/tasks/:id - should delete a task', async ({ request }) => {
        const deleteResponse = await request.delete(`${BASE_URL}/${createdTaskId1}`);
        expect(deleteResponse.status()).toBe(204);

        const checkResponse = await request.get(`${BASE_URL}/${createdTaskId1}`);
        expect(checkResponse.status()).toBe(404);
    });

    /**
     * ✅ Metamorphic Relation (MR) Tests (Added for higher mutation score)
     */

    test('MR1: Adding a new task should not remove existing ones', async ({ request }) => {
        const newTask = { title: `MR Task ${Date.now()}`, priority: "High", completed: false };
        const response = await request.post(BASE_URL, { data: newTask });
        expect(response.status()).toBe(201);

        const allTasksResponse = await request.get(BASE_URL);
        const allTasks = await allTasksResponse.json();
        expect(allTasks.length).toBeGreaterThan(2);
    });

    test('MR2: Deleting a task should remove it but not others', async ({ request }) => {
        await request.delete(`${BASE_URL}/${createdTaskId1}`);

        const checkDeletedResponse = await request.get(`${BASE_URL}/${createdTaskId1}`);
        expect(checkDeletedResponse.status()).toBe(404);

        const checkOtherResponse = await request.get(`${BASE_URL}/${createdTaskId2}`);
        expect(checkOtherResponse.status()).toBe(200);
    });

    test('MR3: Deleting a task twice should return valid responses', async ({ request }) => {
        await request.delete(`${BASE_URL}/${createdTaskId1}`);
        const secondDeleteResponse = await request.delete(`${BASE_URL}/${createdTaskId1}`);
        expect([204, 404]).toContain(secondDeleteResponse.status());
    });

    test('MR4: Updating a task should only affect the specified fields', async ({ request }) => {
        const updateData = { title: "Updated MR Task", completed: true };

        await request.put(`${BASE_URL}/${createdTaskId1}`, { data: updateData });
        const updatedTask = await request.get(`${BASE_URL}/${createdTaskId1}`).then(res => res.json());

        expect(updatedTask.title).toBe(updateData.title);
        expect(updatedTask.completed).toBe(updateData.completed);
        expect(updatedTask.priority).toBeDefined();
    });

/**
 * ✅ MR5: Order Independence - Fetching tasks should return the same set regardless of order
 */
/**
 */
test('MR5: Order independence - Task retrieval should be consistent', async ({ request }) => {
    let tasks1 = await request.get(BASE_URL).then(res => res.json());

    // Delay slightly to avoid concurrent changes
    await new Promise(resolve => setTimeout(resolve, 500));

    let tasks2 = await request.get(BASE_URL).then(res => res.json());

    // 🔹 If the first attempt fails, retry once to account for timing issues
    if (tasks1.length !== tasks2.length) {
        console.warn(`⚠ Task count mismatch: Retrying in 1s...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        tasks2 = await request.get(BASE_URL).then(res => res.json());
    }

    const taskIds1 = new Set(tasks1.map(task => task._id));
    const taskIds2 = new Set(tasks2.map(task => task._id));

    // 🔹 Ensure all tasks exist in both retrievals, instead of checking exact length
    const missingFromSecondFetch = [...taskIds1].filter(id => !taskIds2.has(id));
    const extraInSecondFetch = [...taskIds2].filter(id => !taskIds1.has(id));

    console.log(`Missing from second fetch:`, missingFromSecondFetch);
    console.log(`Extra in second fetch:`, extraInSecondFetch);

    expect(missingFromSecondFetch.length).toBe(0);
    expect(extraInSecondFetch.length).toBe(0);
});




    test('MR6: Task ID uniqueness - Each task should have a unique ID', async ({ request }) => {
        const response = await request.get(BASE_URL);
        const tasks = await response.json();

        const taskIds = tasks.map(task => task._id);
        const uniqueTaskIds = new Set(taskIds);

        expect(taskIds.length).toBe(uniqueTaskIds.size);
    });

    test('MR7: Completion status change should not modify unrelated fields', async ({ request }) => {
        const taskBeforeUpdate = await request.get(`${BASE_URL}/${createdTaskId1}`).then(res => res.json());

        await request.put(`${BASE_URL}/${createdTaskId1}`, { data: { completed: !taskBeforeUpdate.completed } });

        const taskAfterUpdate = await request.get(`${BASE_URL}/${createdTaskId1}`).then(res => res.json());

        expect(taskAfterUpdate.completed).toBe(!taskBeforeUpdate.completed);
        expect(taskAfterUpdate.title).toBe(taskBeforeUpdate.title);
        expect(taskAfterUpdate.priority).toBe(taskBeforeUpdate.priority);
    });
    test('MR8: Create–Delete cancellation should leave system state unchanged', async ({ request }) => {
    // Step 1: Get task count before
    const beforeRes = await request.get(BASE_URL);
    const beforeTasks = await beforeRes.json();
    const beforeCount = beforeTasks.length;

    // Step 2: Create a temporary task
    const task = {
        title: `Temp Task - ${Date.now()}`,
        description: "Temporary task",
        dueDate: "2025-12-31T23:59:59.000Z",
        priority: "Low",
        completed: false
    };

    const createRes = await request.post(BASE_URL, { data: task });
    expect(createRes.status()).toBe(201);

    const createdTaskId = (await createRes.json())._id;

    // Step 3: Delete the newly created task
    const deleteRes = await request.delete(`${BASE_URL}/${createdTaskId}`);
    expect(deleteRes.status()).toBe(204);

    // Step 4: Get task count after create-delete sequence
    const afterRes = await request.get(BASE_URL);
    const afterTasks = await afterRes.json();
    const afterCount = afterTasks.length;

    // Step 5: Check state remains the same
    expect(afterCount).toBe(beforeCount);
});
test('MR9: Calling DELETE /all twice should be safe and idempotent', async ({ request }) => {
    // First delete
    const firstDelete = await request.delete(`${BASE_URL}/all`);
    expect(firstDelete.status()).toBe(204);

    // Second delete (no tasks should exist)
    const secondDelete = await request.delete(`${BASE_URL}/all`);
    expect(secondDelete.status()).toBe(204);

    // Confirm no tasks remain
    const after = await request.get(BASE_URL);
    const tasks = await after.json();
    expect(tasks.length).toBe(0);
});



});
