// @ts-nocheck
import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://localhost:5000/api/tasks';
let createdTaskId1, createdTaskId2; // Store multiple task IDs

test.describe('Masters Thesis: Case Study 3', () => {

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

    // test('MR1: Adding a new task should not remove existing ones', async ({ request }) => {
    //     const newTask = { title: `MR Task ${Date.now()}`, priority: "High", completed: false };
    //     const response = await request.post(BASE_URL, { data: newTask });
    //     expect(response.status()).toBe(201);

    //     const allTasksResponse = await request.get(BASE_URL);
    //     const allTasks = await allTasksResponse.json();
    //     expect(allTasks.length).toBeGreaterThan(2);
    // });
test('MR1: Adding a task with a duplicate title should not be allowed', async ({ request }) => {
    const duplicateTitle = `MR Duplicate ${Date.now()}`;

    // First creation should succeed
    const first = await request.post(BASE_URL, {
        data: { title: duplicateTitle, priority: "High", completed: false }
    });

    if (first.status() !== 201) {
        console.log(`❌ MR1 FAILED: Could not create initial task with title "${duplicateTitle}"`);
        throw new Error('Initial task creation failed.');
    }

    // Second creation with same title (case-insensitive) should fail
    const second = await request.post(BASE_URL, {
        data: { title: duplicateTitle.toUpperCase(), priority: "Medium", completed: false }
    });

    if (second.status() === 400) {
        console.log(`✅ MR1 PASSED: Duplicate title "${duplicateTitle}" was correctly rejected.`);
    } else {
        console.log(`❌ MR1 FAILED: Duplicate title "${duplicateTitle}" was incorrectly accepted.`);
    }

    expect(second.status()).toBe(400);
});


    // test('MR2: Deleting a task should remove it but not others', async ({ request }) => {
    //     await request.delete(`${BASE_URL}/${createdTaskId1}`);

    //     const checkDeletedResponse = await request.get(`${BASE_URL}/${createdTaskId1}`);
    //     expect(checkDeletedResponse.status()).toBe(404);

    //     const checkOtherResponse = await request.get(`${BASE_URL}/${createdTaskId2}`);
    //     expect(checkOtherResponse.status()).toBe(200);
    // });
test('MR2: Deleting a task should remove it but not others', async ({ request }) => {
    await request.delete(`${BASE_URL}/${createdTaskId1}`);

    const checkDeletedResponse = await request.get(`${BASE_URL}/${createdTaskId1}`);
    const checkOtherResponse = await request.get(`${BASE_URL}/${createdTaskId2}`);

    const deletedStatus = checkDeletedResponse.status();
    const otherStatus = checkOtherResponse.status();

    if (deletedStatus === 404 && otherStatus === 200) {
        console.log(`✅ MR2 PASSED: Deleted task ${createdTaskId1} is gone, and other task ${createdTaskId2} remains.`);
    } else {
        console.log(`❌ MR2 FAILED:`);
        if (deletedStatus !== 404) {
            console.log(`- Task ${createdTaskId1} was not properly deleted (status: ${deletedStatus})`);
        }
        if (otherStatus !== 200) {
            console.log(`- Task ${createdTaskId2} was unexpectedly affected (status: ${otherStatus})`);
        }
    }

    expect(deletedStatus).toBe(404);
    expect(otherStatus).toBe(200);
});

 test('MR3: Deleting a task twice should return valid responses', async ({ request }) => {
    // First deletion attempt
    await request.delete(`${BASE_URL}/${createdTaskId1}`);

    // Second deletion attempt (should be safe/idempotent)
    const secondDeleteResponse = await request.delete(`${BASE_URL}/${createdTaskId1}`);
    const status = secondDeleteResponse.status();

    if ([204, 404].includes(status)) {
        console.log(`✅ MR3 PASSED: Second delete on already-deleted task ${createdTaskId1} returned status ${status}.`);
    } else {
        console.log(`❌ MR3 FAILED: Second delete on task ${createdTaskId1} returned unexpected status ${status}.`);
    }

    expect([204, 404]).toContain(status);
});

test('MR4: Updating a task should only affect the specified fields', async ({ request }) => {
    const updateData = { title: "Updated MR Task", completed: true };

    await request.put(`${BASE_URL}/${createdTaskId1}`, { data: updateData });
    const updatedTask = await request.get(`${BASE_URL}/${createdTaskId1}`).then(res => res.json());

    if (
        updatedTask.title === updateData.title &&
        updatedTask.completed === updateData.completed &&
        typeof updatedTask.priority !== 'undefined'
    ) {
        console.log(`✅ MR4 PASSED: title and completed updated correctly, priority preserved.`);
    } else {
        console.log(`❌ MR4 FAILED:`);
        console.log(`- title: expected "${updateData.title}", got "${updatedTask.title}"`);
        console.log(`- completed: expected true, got "${updatedTask.completed}"`);
        console.log(`- priority present: ${typeof updatedTask.priority !== 'undefined'}`);
    }

    expect(updatedTask.title).toBe(updateData.title);
    expect(updatedTask.completed).toBe(updateData.completed);
    expect(updatedTask.priority).toBeDefined();
});




 // ✅ MR5: Order Independence - Fetching tasks should return the same set regardless of order

test('MR5: Order independence - Task retrieval should be consistent', async ({ request }) => {
    let tasks1 = await request.get(BASE_URL).then(res => res.json());

    // Delay slightly to avoid concurrent changes
    await new Promise(resolve => setTimeout(resolve, 500));

    let tasks2 = await request.get(BASE_URL).then(res => res.json());

    // 🔹 Retry if mismatch due to timing
    if (tasks1.length !== tasks2.length) {
        console.warn(`⚠ MR5 Warning: Task count mismatch. Retrying in 1s...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        tasks2 = await request.get(BASE_URL).then(res => res.json());
    }

    const taskIds1 = new Set(tasks1.map(task => task._id));
    const taskIds2 = new Set(tasks2.map(task => task._id));

    const missingFromSecondFetch = [...taskIds1].filter(id => !taskIds2.has(id));
    const extraInSecondFetch = [...taskIds2].filter(id => !taskIds1.has(id));

    if (missingFromSecondFetch.length === 0 && extraInSecondFetch.length === 0) {
        console.log(`✅ MR5 PASSED: All task IDs matched across two fetches.`);
    } else {
        console.log(`❌ MR5 FAILED:`);
        if (missingFromSecondFetch.length > 0) {
            console.log(`- Missing from second fetch:`, missingFromSecondFetch);
        }
        if (extraInSecondFetch.length > 0) {
            console.log(`- Extra in second fetch:`, extraInSecondFetch);
        }
    }

    expect(missingFromSecondFetch.length).toBe(0);
    expect(extraInSecondFetch.length).toBe(0);
});

// ✅ MR6: Task ID Uniqueness - Each task should have a unique ID

 test('MR6: Task ID uniqueness - Each task should have a unique ID', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const tasks = await response.json();

    const taskIds = tasks.map(task => task._id);
    const uniqueTaskIds = new Set(taskIds);

    if (taskIds.length === uniqueTaskIds.size) {
        console.log(`✅ MR6 PASSED: All ${taskIds.length} task IDs are unique.`);
    } else {
        const duplicates = taskIds.filter((id, idx) => taskIds.indexOf(id) !== idx);
        console.log(`❌ MR6 FAILED: Duplicate task IDs found.`);
        console.log(`- Duplicate IDs:`, [...new Set(duplicates)]);
    }

    expect(taskIds.length).toBe(uniqueTaskIds.size);
});

// ✅ MR7: Completion Status Change - Changing completion status should not affect other fields

  test('MR7: Completion status change should not modify unrelated fields', async ({ request }) => {
    const taskBeforeUpdate = await request.get(`${BASE_URL}/${createdTaskId1}`).then(res => res.json());

    // Flip the completed status
    await request.put(`${BASE_URL}/${createdTaskId1}`, {
        data: { completed: !taskBeforeUpdate.completed }
    });

    const taskAfterUpdate = await request.get(`${BASE_URL}/${createdTaskId1}`).then(res => res.json());

    const completedCorrect = taskAfterUpdate.completed === !taskBeforeUpdate.completed;
    const titleUnchanged = taskAfterUpdate.title === taskBeforeUpdate.title;
    const priorityUnchanged = taskAfterUpdate.priority === taskBeforeUpdate.priority;

    if (completedCorrect && titleUnchanged && priorityUnchanged) {
        console.log(`✅ MR7 PASSED: Only 'completed' field changed. Title and priority remained intact.`);
    } else {
        console.log(`❌ MR7 FAILED:`);
        if (!completedCorrect) {
            console.log(`- 'completed' expected to be ${!taskBeforeUpdate.completed}, got ${taskAfterUpdate.completed}`);
        }
        if (!titleUnchanged) {
            console.log(`- 'title' changed: before = "${taskBeforeUpdate.title}", after = "${taskAfterUpdate.title}"`);
        }
        if (!priorityUnchanged) {
            console.log(`- 'priority' changed: before = "${taskBeforeUpdate.priority}", after = "${taskAfterUpdate.priority}"`);
        }
    }

    expect(taskAfterUpdate.completed).toBe(!taskBeforeUpdate.completed);
    expect(taskAfterUpdate.title).toBe(taskBeforeUpdate.title);
    expect(taskAfterUpdate.priority).toBe(taskBeforeUpdate.priority);
});

// ✅ MR8: Create–Delete cancellation should leave system state unchanged
// This test checks that creating a task and then deleting it should not change the overall state of the system.
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
    if (afterCount === beforeCount) {
        console.log(`✅ MR8 PASSED: Task count before and after create-delete sequence is consistent (${beforeCount}).`);
    } else {
        console.log(`❌ MR8 FAILED:`);
        console.log(`- Before count: ${beforeCount}, After count: ${afterCount}`);
    }

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

    if (tasks.length === 0) {
        console.log(`✅ MR9 PASSED: All tasks deleted and second delete was idempotent.`);
    } else {
        console.log(`❌ MR9 FAILED: Expected 0 tasks, but found ${tasks.length}.`);
    }

    expect(tasks.length).toBe(0);
});




});
