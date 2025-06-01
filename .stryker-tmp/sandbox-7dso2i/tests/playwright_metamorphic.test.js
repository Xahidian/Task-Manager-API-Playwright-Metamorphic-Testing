// @ts-nocheck
import { test, expect, request } from '@playwright/test';

const BASE_URL = 'http://localhost:5000/api/tasks';
let createdTaskId1, createdTaskId2; // Store multiple task IDs

test.describe('Masters Thesis: Case Study 3', () => {

    /**
     *  Before each test: Create two tasks for testing.
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
     *  Cleanup after each test: Delete all created tasks.
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
     *  Standard Playwright API Tests (from your original test cases)
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
     *  Metamorphic Relation (MR) Tests (Added for higher mutation score)
     */

    // test('MR1: Adding a new task should not remove existing ones', async ({ request }) => {
    //     const newTask = { title: `MR Task ${Date.now()}`, priority: "High", completed: false };
    //     const response = await request.post(BASE_URL, { data: newTask });
    //     expect(response.status()).toBe(201);

    //     const allTasksResponse = await request.get(BASE_URL);
    //     const allTasks = await allTasksResponse.json();
    //     expect(allTasks.length).toBeGreaterThan(2);
    // });
test('MR1: Adding a task with duplicate title should be rejected', async ({ request }) => {
    // Seed Input
    const seedTitle = `MR Duplicate ${Date.now()}`;
    const seedTask = { title: seedTitle, priority: "High", completed: false };

    // Seed Execution
    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    const seedStatus = seedResponse.status();
    expect(seedStatus).toBe(201);
    console.log(`Seed Task created with title "${seedTitle}" (status ${seedStatus}).`);

    // Transformation
    const morphedTitle = seedTitle.toUpperCase();
    const morphedTask = { title: morphedTitle, priority: "Medium", completed: false };

    // Morphed Execution
    const morphedResponse = await request.post(BASE_URL, { data: morphedTask });
    const morphedStatus = morphedResponse.status();

    // Check the relation
    if (morphedStatus === 400) {
        console.log(` MR1 PASSED: Duplicate title "${morphedTitle}" was correctly rejected.`);
    } else {
        console.log(` MR1 FAILED: Duplicate title "${morphedTitle}" was incorrectly accepted (status ${morphedStatus}).`);
    }

    expect(morphedStatus).toBe(400);
});


    // test('MR2: Deleting a task should remove it but not others', async ({ request }) => {
    //     await request.delete(`${BASE_URL}/${createdTaskId1}`);

    //     const checkDeletedResponse = await request.get(`${BASE_URL}/${createdTaskId1}`);
    //     expect(checkDeletedResponse.status()).toBe(404);

    //     const checkOtherResponse = await request.get(`${BASE_URL}/${createdTaskId2}`);
    //     expect(checkOtherResponse.status()).toBe(200);
    // });
test('MR2: Deleting a task should remove it but not others', async ({ request }) => {
    console.log(`\n **MR2: Deleting a task should remove it but not others**`);

    //  Seed Input: Create two tasks
    const seedTask1 = { title: `Task1-${Date.now()}`, priority: "Medium", completed: false };
    const seedTask2 = { title: `Task2-${Date.now()}`, priority: "High", completed: false };
    console.log(` Seed Input:`);
    console.log(`- Task 1:`, seedTask1);
    console.log(`- Task 2:`, seedTask2);

    // Execute Seed Input
    const seedResponse1 = await request.post(BASE_URL, { data: seedTask1 });
    const seedResponse2 = await request.post(BASE_URL, { data: seedTask2 });
    const id1 = (await seedResponse1.json())._id;
    const id2 = (await seedResponse2.json())._id;
    expect(seedResponse1.status()).toBe(201);
    expect(seedResponse2.status()).toBe(201);

    //  Seed Output: Confirm both tasks exist
    const seedOutput1 = await request.get(`${BASE_URL}/${id1}`);
    const seedOutput2 = await request.get(`${BASE_URL}/${id2}`);
    console.log(` Seed Output:`);
    console.log(`- Task 1 Status: ${seedOutput1.status()}`);
    console.log(`- Task 2 Status: ${seedOutput2.status()}`);
    expect(seedOutput1.status()).toBe(200);
    expect(seedOutput2.status()).toBe(200);

    //  Morphed Input: Delete Task 1
    console.log(` Morphed Input: DELETE /api/tasks/${id1}`);
    const morphedDeleteResponse = await request.delete(`${BASE_URL}/${id1}`);
    console.log(`- Delete Task 1 Status: ${morphedDeleteResponse.status()}`);
    expect(morphedDeleteResponse.status()).toBe(204);

    //  Morphed Output: Check Task 1 deleted, Task 2 unaffected
    const morphedOutput1 = await request.get(`${BASE_URL}/${id1}`);
    const morphedOutput2 = await request.get(`${BASE_URL}/${id2}`);
    const deletedStatus = morphedOutput1.status();
    const otherStatus = morphedOutput2.status();
    console.log(` Morphed Output:`);
    console.log(`- Task 1 Status (after delete): ${deletedStatus}`);
    console.log(`- Task 2 Status (should be unaffected): ${otherStatus}`);

    // 🧪 Output Relation Check
    if (deletedStatus === 404 && otherStatus === 200) {
        console.log(` MR2 PASSED: Task 1 was deleted, Task 2 remained intact.`);
    } else {
        console.log(` MR2 FAILED:`);
        if (deletedStatus !== 404) console.log(`- Expected Task 1 to be deleted, but got status ${deletedStatus}`);
        if (otherStatus !== 200) console.log(`- Expected Task 2 to remain, but got status ${otherStatus}`);
    }

    expect(deletedStatus).toBe(404);
    expect(otherStatus).toBe(200);
});



test('MR3: Deleting a task twice should return valid responses', async ({ request }) => {
    console.log(`\n **MR3: Deleting a task twice should return valid responses**`);

    // 📥 Seed Input: Create a task
    const seedTask = { title: `MR3-Task-${Date.now()}`, priority: "Low", completed: false };
    console.log(` Seed Input:`, seedTask);

    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    const taskId = (await seedResponse.json())._id;
    expect(seedResponse.status()).toBe(201);

    //  Seed Output: Confirm task exists
    const seedOutput = await request.get(`${BASE_URL}/${taskId}`);
    console.log(` Seed Output:`);
    console.log(`- Task created with ID: ${taskId}, Status: ${seedOutput.status()}`);
    expect(seedOutput.status()).toBe(200);

    //  Morphed Input: Delete the task twice
    console.log(` Morphed Input: DELETE /api/tasks/${taskId} (1st time)`);
    const firstDelete = await request.delete(`${BASE_URL}/${taskId}`);
    console.log(`- First Delete Status: ${firstDelete.status()}`);
    expect(firstDelete.status()).toBe(204);

    console.log(` Morphed Input: DELETE /api/tasks/${taskId} (2nd time)`);
    const secondDelete = await request.delete(`${BASE_URL}/${taskId}`);
    console.log(`- Second Delete Status: ${secondDelete.status()}`);

    //  Morphed Output: Evaluate second delete response
    const validStatuses = [204, 404];  // Acceptable outputs: success (idempotent) or not found
    console.log(`📤 Morphed Output: Valid statuses = ${validStatuses}, Got = ${secondDelete.status()}`);

    //  Output Relation Check
    if (validStatuses.includes(secondDelete.status())) {
        console.log(` MR3 PASSED: Second delete returned valid status (${secondDelete.status()}).`);
    } else {
        console.log(` MR3 FAILED: Second delete returned unexpected status (${secondDelete.status()}).`);
    }

    expect(validStatuses).toContain(secondDelete.status());
});


test('MR4: Updating a task should only affect the specified fields', async ({ request }) => {
    console.log(`\n **MR4: Updating a task should only affect the specified fields**`);

    //  Seed Input: Create a task
    const seedTask = { title: `MR4-Task-${Date.now()}`, priority: "High", completed: false };
    console.log(` Seed Input:`, seedTask);

    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    const taskId = (await seedResponse.json())._id;
    expect(seedResponse.status()).toBe(201);

    //  Seed Output: Retrieve the created task
    const seedOutput = await request.get(`${BASE_URL}/${taskId}`).then(res => res.json());
    console.log(` Seed Output:`);
    console.log(`- Retrieved Task:`, seedOutput);

    //  Morphed Input: Update only 'title' and 'completed'
    const morphedUpdate = { title: "MR4-Updated-Title", completed: true };
    console.log(` Morphed Input (update fields):`, morphedUpdate);

    const updateResponse = await request.put(`${BASE_URL}/${taskId}`, { data: morphedUpdate });
    console.log(`- Update Status: ${updateResponse.status()}`);
    expect(updateResponse.status()).toBe(200);

    //  Morphed Output: Retrieve updated task
    const morphedOutput = await request.get(`${BASE_URL}/${taskId}`).then(res => res.json());
    console.log(` Morphed Output:`);
    console.log(`- Updated Task:`, morphedOutput);

    //  Relation Check: Title and completed updated; priority unchanged
    const titleChanged = morphedOutput.title === morphedUpdate.title;
    const completedChanged = morphedOutput.completed === morphedUpdate.completed;
    const priorityUnchanged = morphedOutput.priority === seedOutput.priority;

    if (titleChanged && completedChanged && priorityUnchanged) {
        console.log(` MR4 PASSED: Updated fields applied, unrelated fields preserved.`);
    } else {
        console.log(` MR4 FAILED:`);
        if (!titleChanged) console.log(`- Title mismatch: expected "${morphedUpdate.title}", got "${morphedOutput.title}"`);
        if (!completedChanged) console.log(`- Completed mismatch: expected ${morphedUpdate.completed}, got ${morphedOutput.completed}`);
        if (!priorityUnchanged) console.log(`- Priority changed: expected "${seedOutput.priority}", got "${morphedOutput.priority}"`);
    }

    expect(titleChanged).toBe(true);
    expect(completedChanged).toBe(true);
    expect(priorityUnchanged).toBe(true);
});




 //  MR5: Order Independence - Fetching tasks should return the same set regardless of order

test('MR5: Order independence - Task retrieval should be consistent', async ({ request }) => {
    console.log(`\n **MR5: Order independence - Task retrieval should be consistent**`);

    //  Seed Input: Fetch all tasks
    console.log(` Seed Input: GET ${BASE_URL}`);
    const seedResponse = await request.get(BASE_URL);
    const seedTasks = await seedResponse.json();
    const seedTaskIds = new Set(seedTasks.map(task => task._id));
    console.log(` Seed Output: Retrieved ${seedTasks.length} tasks.`);
    console.log(`- Task IDs:`, [...seedTaskIds]);

    //  Morphed Input: Wait briefly, then fetch all tasks again (simulate order variation)
    console.log(` Morphed Input: Delay and re-fetch tasks.`);
    await new Promise(resolve => setTimeout(resolve, 500));  // Small delay to reduce timing issues
    const morphedResponse = await request.get(BASE_URL);
    const morphedTasks = await morphedResponse.json();
    const morphedTaskIds = new Set(morphedTasks.map(task => task._id));
    console.log(` Morphed Output: Retrieved ${morphedTasks.length} tasks.`);
    console.log(`- Task IDs:`, [...morphedTaskIds]);

    //  Relation Check: Ensure both fetches return the same set of task IDs
    const missingFromSecond = [...seedTaskIds].filter(id => !morphedTaskIds.has(id));
    const extraInSecond = [...morphedTaskIds].filter(id => !seedTaskIds.has(id));

    if (missingFromSecond.length === 0 && extraInSecond.length === 0) {
        console.log(` MR5 PASSED: Task sets matched across both fetches.`);
    } else {
        console.log(` MR5 FAILED:`);
        if (missingFromSecond.length > 0) console.log(`- Missing in second fetch:`, missingFromSecond);
        if (extraInSecond.length > 0) console.log(`- Extra in second fetch:`, extraInSecond);
    }

    expect(missingFromSecond.length).toBe(0);
    expect(extraInSecond.length).toBe(0);
});


//  MR6: Task ID Uniqueness - Each task should have a unique ID

 test('MR6: Task ID uniqueness - Each task should have a unique ID', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const tasks = await response.json();

    const taskIds = tasks.map(task => task._id);
    const uniqueTaskIds = new Set(taskIds);

    if (taskIds.length === uniqueTaskIds.size) {
        console.log(` MR6 PASSED: All ${taskIds.length} task IDs are unique.`);
    } else {
        const duplicates = taskIds.filter((id, idx) => taskIds.indexOf(id) !== idx);
        console.log(` MR6 FAILED: Duplicate task IDs found.`);
        console.log(`- Duplicate IDs:`, [...new Set(duplicates)]);
    }

    expect(taskIds.length).toBe(uniqueTaskIds.size);
});

//  MR7: Completion Status Change - Changing completion status should not affect other fields

test('MR7: Completion status change should not modify unrelated fields', async ({ request }) => {
    console.log(`\n **MR7: Completion status change should not modify unrelated fields**`);

    //  Seed Input: Create a new task
    const seedTask = { title: `MR7-Task-${Date.now()}`, priority: "Medium", completed: false };
    console.log(` Seed Input:`, seedTask);

    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    const taskId = (await seedResponse.json())._id;
    expect(seedResponse.status()).toBe(201);

    //  Seed Output: Retrieve and log the initial task state
    const seedOutput = await request.get(`${BASE_URL}/${taskId}`).then(res => res.json());
    console.log(` Seed Output:`);
    console.log(`- Retrieved Task:`, seedOutput);

    //  Morphed Input: Flip the 'completed' status
    const morphedUpdate = { completed: !seedOutput.completed };
    console.log(` Morphed Input:`, morphedUpdate);

    const updateResponse = await request.put(`${BASE_URL}/${taskId}`, { data: morphedUpdate });
    console.log(`- Update Status: ${updateResponse.status()}`);
    expect(updateResponse.status()).toBe(200);

    //  Morphed Output: Retrieve the updated task
    const morphedOutput = await request.get(`${BASE_URL}/${taskId}`).then(res => res.json());
    console.log(` Morphed Output:`);
    console.log(`- Updated Task:`, morphedOutput);

    //  Relation Check: Only 'completed' field should change; 'title' and 'priority' must remain the same
    const completedChanged = morphedOutput.completed === !seedOutput.completed;
    const titleUnchanged = morphedOutput.title === seedOutput.title;
    const priorityUnchanged = morphedOutput.priority === seedOutput.priority;

    if (completedChanged && titleUnchanged && priorityUnchanged) {
        console.log(` MR7 PASSED: Only 'completed' field changed, unrelated fields preserved.`);
    } else {
        console.log(` MR7 FAILED:`);
        if (!completedChanged) console.log(`- 'completed' mismatch: expected ${!seedOutput.completed}, got ${morphedOutput.completed}`);
        if (!titleUnchanged) console.log(`- 'title' changed: expected "${seedOutput.title}", got "${morphedOutput.title}"`);
        if (!priorityUnchanged) console.log(`- 'priority' changed: expected "${seedOutput.priority}", got "${morphedOutput.priority}"`);
    }

    expect(completedChanged).toBe(true);
    expect(titleUnchanged).toBe(true);
    expect(priorityUnchanged).toBe(true);
});


//  MR8: Create–Delete cancellation should leave system state unchanged
// This test checks that creating a task and then deleting it should not change the overall state of the system.
test('MR8: Create–Delete cancellation should leave system state unchanged', async ({ request }) => {
    console.log(`\n **MR8: Create–Delete cancellation should leave system state unchanged**`);

    //  Seed Input: Get the current task count
    const seedResponse = await request.get(BASE_URL);
    const seedTasks = await seedResponse.json();
    const seedCount = seedTasks.length;
    console.log(` Seed Input: Task count before create-delete sequence = ${seedCount}`);

    //  Transformation: Create a new temporary task
    const morphedTask = {
        title: `MR8-Temp-${Date.now()}`,
        description: "Temporary task",
        dueDate: "2025-12-31T23:59:59.000Z",
        priority: "Low",
        completed: false
    };
    console.log(` Morphed Input: Create temporary task:`, morphedTask);
    const createResponse = await request.post(BASE_URL, { data: morphedTask });
    expect(createResponse.status()).toBe(201);
    const tempTaskId = (await createResponse.json())._id;
    console.log(`- Created Task ID: ${tempTaskId}`);

    //  Morphed Input (continued): Delete the temporary task
    console.log(` Morphed Input (continued): DELETE /api/tasks/${tempTaskId}`);
    const deleteResponse = await request.delete(`${BASE_URL}/${tempTaskId}`);
    expect(deleteResponse.status()).toBe(204);

    //  Morphed Output: Get the task count after create-delete sequence
    const morphedResponse = await request.get(BASE_URL);
    const morphedTasks = await morphedResponse.json();
    const morphedCount = morphedTasks.length;
    console.log(` Morphed Output: Task count after create-delete sequence = ${morphedCount}`);

    //  Relation Check: Task count should remain unchanged
    if (morphedCount === seedCount) {
        console.log(` MR8 PASSED: System state unchanged after create-delete cancellation.`);
    } else {
        console.log(` MR8 FAILED:`);
        console.log(`- Expected task count: ${seedCount}, got: ${morphedCount}`);
    }

    expect(morphedCount).toBe(seedCount);
});


test('MR9: Calling DELETE /all twice should be safe and idempotent', async ({ request }) => {
    console.log(`\n **MR9: Calling DELETE /all twice should be safe and idempotent**`);

    //  Seed Input: DELETE /api/tasks/all (first delete)
    console.log(` Seed Input: DELETE ${BASE_URL}/all (first delete)`);
    const firstDeleteResponse = await request.delete(`${BASE_URL}/all`);
    console.log(`- First Delete Status: ${firstDeleteResponse.status()}`);
    expect(firstDeleteResponse.status()).toBe(204);

    //  Seed Output: Confirm system state (all tasks deleted)
    const afterFirstDelete = await request.get(BASE_URL);
    const afterFirstDeleteTasks = await afterFirstDelete.json();
    console.log(` Seed Output: Number of tasks after first delete = ${afterFirstDeleteTasks.length}`);
    expect(afterFirstDeleteTasks.length).toBe(0);

    //  Morphed Input: DELETE /api/tasks/all (second delete)
    console.log(` Morphed Input: DELETE ${BASE_URL}/all (second delete)`);
    const secondDeleteResponse = await request.delete(`${BASE_URL}/all`);
    console.log(`- Second Delete Status: ${secondDeleteResponse.status()}`);
    expect(secondDeleteResponse.status()).toBe(204);

    //  Morphed Output: Confirm system state (still no tasks)
    const afterSecondDelete = await request.get(BASE_URL);
    const afterSecondDeleteTasks = await afterSecondDelete.json();
    console.log(` Morphed Output: Number of tasks after second delete = ${afterSecondDeleteTasks.length}`);

    //  Relation Check: System should remain empty after both deletes
    if (afterSecondDeleteTasks.length === 0) {
        console.log(` MR9 PASSED: System state remains unchanged and deletion is idempotent.`);
    } else {
        console.log(` MR9 FAILED:`);
        console.log(`- Expected 0 tasks, but found ${afterSecondDeleteTasks.length}.`);
    }

    expect(afterSecondDeleteTasks.length).toBe(0);
});

test('MR10: Update non-existent task should return 404', async ({ request }) => {
    console.log(`\n **MR10: Update non-existent task should return 404**`);

    //  Seed Input: Create a valid task and capture its ID (to use a fake variant later)
    const seedTask = { title: `MR10-Task-${Date.now()}`, priority: "Medium", completed: false };
    console.log(` Seed Input:`, seedTask);

    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    const validTaskId = (await seedResponse.json())._id;
    expect(seedResponse.status()).toBe(201);

    //  Seed Output: Verify task creation
    const seedOutput = await request.get(`${BASE_URL}/${validTaskId}`).then(res => res.json());
    console.log(` Seed Output: Created Task:`, seedOutput);

    //  Transformation: Generate a non-existent (but valid format) ObjectId
    const nonExistentId = 'ffffffffffffffffffffffff'; // 24-char valid but non-existent ObjectId
    const morphedUpdate = { title: "MR10-Updated-Title" };
    console.log(` Morphed Input: Attempting to update non-existent task ID ${nonExistentId}`);
    console.log(`- Update Payload:`, morphedUpdate);

    const morphedResponse = await request.put(`${BASE_URL}/${nonExistentId}`, { data: morphedUpdate });
    console.log(`- Morphed Response Status: ${morphedResponse.status()}`);

    //  Morphed Output: Should return 404
    const morphedOutput = await morphedResponse.json();
    console.log(` Morphed Output:`, morphedOutput);

    //  Relation Check: Update on non-existent ID returns 404 error
    if (morphedResponse.status() === 404) {
        console.log(` MR10 PASSED: Non-existent task update correctly returned 404.`);
    } else {
        console.log(` MR10 FAILED: Expected 404, but got ${morphedResponse.status()}.`);
    }

    expect(morphedResponse.status()).toBe(404);
});
test('MR11: Delete non-existent task should return 404', async ({ request }) => {
    console.log(`\n **MR11: Delete non-existent task should return 404**`);

    //  Seed Input: Create a valid task and capture its ID (for format reference)
    const seedTask = { title: `MR11-Task-${Date.now()}`, priority: "Low", completed: false };
    console.log(` Seed Input:`, seedTask);

    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    const validTaskId = (await seedResponse.json())._id;
    expect(seedResponse.status()).toBe(201);

    //  Seed Output: Confirm task creation
    const seedOutput = await request.get(`${BASE_URL}/${validTaskId}`).then(res => res.json());
    console.log(` Seed Output: Created Task:`, seedOutput);

    //  Transformation: Construct a valid but non-existent ObjectId
    const nonExistentId = 'eeeeeeeeeeeeeeeeeeeeeeee'; // 24-char valid but non-existent ObjectId
    console.log(` Morphed Input: Attempting to delete non-existent task ID ${nonExistentId}`);

    const morphedResponse = await request.delete(`${BASE_URL}/${nonExistentId}`);
    console.log(`- Morphed Response Status: ${morphedResponse.status()}`);

    //  Morphed Output: Should return 404
    const morphedOutput = await morphedResponse.json();
    console.log(` Morphed Output:`, morphedOutput);

    // 🧪 Relation Check: Delete on non-existent ID returns 404 error
    if (morphedResponse.status() === 404) {
        console.log(` MR11 PASSED: Non-existent task deletion correctly returned 404.`);
    } else {
        console.log(` MR11 FAILED: Expected 404, but got ${morphedResponse.status()}.`);
    }

    expect(morphedResponse.status()).toBe(404);
});
test('MR12: Create task with invalid priority or dueDate should fail', async ({ request }) => {
    console.log(`\n **MR12: Create task with invalid priority or dueDate should fail**`);

    //  Seed Input: Create a valid task (for baseline)
    const seedTask = { title: `MR12-Task-${Date.now()}`, priority: "Medium", dueDate: "2025-12-31T23:59:59.000Z", completed: false };
    console.log(` Seed Input:`, seedTask);

    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    const seedStatus = seedResponse.status();
    console.log(` Seed Output: Status ${seedStatus}`);
    expect(seedStatus).toBe(201);

    //  Transformation: Modify priority to invalid value
    const morphedTaskPriority = { ...seedTask, title: `${seedTask.title}-InvalidPriority`, priority: "Urgent" };
    console.log(` Morphed Input (Invalid Priority):`, morphedTaskPriority);

    const morphedPriorityResponse = await request.post(BASE_URL, { data: morphedTaskPriority });
    const morphedPriorityStatus = morphedPriorityResponse.status();
    const morphedPriorityOutput = await morphedPriorityResponse.json();
    console.log(` Morphed Output (Invalid Priority): Status ${morphedPriorityStatus}`, morphedPriorityOutput);

    //  Relation Check for Invalid Priority
    if (morphedPriorityStatus === 400) {
        console.log(` MR12 (Priority) PASSED: Invalid priority correctly rejected.`);
    } else {
        console.log(` MR12 (Priority) FAILED: Expected 400, got ${morphedPriorityStatus}.`);
    }
    expect(morphedPriorityStatus).toBe(400);

    //  Transformation: Modify dueDate to invalid format
    const morphedTaskDueDate = { ...seedTask, title: `${seedTask.title}-InvalidDate`, dueDate: "invalid-date-format" };
    console.log(` Morphed Input (Invalid DueDate):`, morphedTaskDueDate);

    const morphedDueDateResponse = await request.post(BASE_URL, { data: morphedTaskDueDate });
    const morphedDueDateStatus = morphedDueDateResponse.status();
    const morphedDueDateOutput = await morphedDueDateResponse.json();
    console.log(` Morphed Output (Invalid DueDate): Status ${morphedDueDateStatus}`, morphedDueDateOutput);

    //  Relation Check for Invalid DueDate
    if (morphedDueDateStatus === 400) {
        console.log(` MR12 (DueDate) PASSED: Invalid due date correctly rejected.`);
    } else {
        console.log(` MR12 (DueDate) FAILED: Expected 400, got ${morphedDueDateStatus}.`);
    }
    expect(morphedDueDateStatus).toBe(400);
});




});
