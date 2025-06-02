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

test('MR5: Adding a task should result in superset of original tasks', async ({ request }) => {
    console.log(`\n **MR5: Adding a task results in superset of original tasks**`);

    //  Explicit Seed Input: Create a known task
    const seedTask = { title: `MR5-Seed-${Date.now()}`, priority: "High", completed: false };
    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    expect(seedResponse.status()).toBe(201);
    const seedTaskId = (await seedResponse.json())._id;

    //  Retrieve tasks after adding the seed task
    const seedTasksResponse = await request.get(BASE_URL);
    const seedTasks = await seedTasksResponse.json();
    const seedTaskIds = new Set(seedTasks.map(task => task._id));
    console.log(` Seed Output: Retrieved ${seedTasks.length} tasks, including seed task ID: ${seedTaskId}`);

    //  Transformation (Morphed Input): Add another new task
    const newTask = { title: `MR5-New-${Date.now()}`, priority: "Medium", completed: false };
    const newTaskResponse = await request.post(BASE_URL, { data: newTask });
    expect(newTaskResponse.status()).toBe(201);
    const newTaskId = (await newTaskResponse.json())._id;

    //  Retrieve tasks after addition
    const morphedTasksResponse = await request.get(BASE_URL);
    const morphedTasks = await morphedTasksResponse.json();
    const morphedTaskIds = new Set(morphedTasks.map(task => task._id));

    //  Relation Check
    const missing = [...seedTaskIds].filter(id => !morphedTaskIds.has(id));
    const newTaskIncluded = morphedTaskIds.has(newTaskId);
    expect(missing.length).toBe(0);
    expect(newTaskIncluded).toBe(true);
});




//  MR6: Task ID Uniqueness - Each task should have a unique ID

test('MR6: Task ID uniqueness - IDs remain unique after adding a task', async ({ request }) => {
    console.log(`\n **MR6: Task ID uniqueness - IDs remain unique after adding a task**`);

    //  Explicit Seed Input: Create a known task
    const seedTask = { title: `MR6-Seed-${Date.now()}`, priority: "High", completed: false };
    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    expect(seedResponse.status()).toBe(201);
    const seedTaskId = (await seedResponse.json())._id;

    //  Retrieve tasks after adding the seed task
    const seedTasksResponse = await request.get(BASE_URL);
    const seedTasks = await seedTasksResponse.json();
    const seedIds = new Set(seedTasks.map(task => task._id));

    //  Transformation: Add another new task
    const newTask = { title: `MR6-New-${Date.now()}`, priority: "Medium", completed: false };
    const newTaskResponse = await request.post(BASE_URL, { data: newTask });
    expect(newTaskResponse.status()).toBe(201);
    const newTaskId = (await newTaskResponse.json())._id;

    //  Retrieve tasks after addition
    const morphedTasksResponse = await request.get(BASE_URL);
    const morphedTasks = await morphedTasksResponse.json();
    const morphedIds = morphedTasks.map(task => task._id);
    const uniqueMorphedIds = new Set(morphedIds);

    //  Relation Check
    expect(morphedIds.length).toBe(uniqueMorphedIds.size);
    expect(morphedIds).toContain(newTaskId);
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

    //  Explicit Seed Input: Create a known task
    const seedTask = { title: `MR8-Seed-${Date.now()}`, priority: "Low", completed: false };
    console.log(` Creating seed task with title: ${seedTask.title}`);
    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    expect(seedResponse.status()).toBe(201);
    const seedTaskId = (await seedResponse.json())._id;
    console.log(` Seed task created with ID: ${seedTaskId}`);

    //  Retrieve task count after seed input
    console.log(` Retrieving task count after creating seed task...`);
    const seedTasksResponse = await request.get(BASE_URL);
    const seedTasks = await seedTasksResponse.json();
    const seedCount = seedTasks.length;
    console.log(` Initial task count (after seed task creation): ${seedCount}`);

    //  Transformation: Create a new task and then delete it
    const newTask = { title: `MR8-New-${Date.now()}`, priority: "High", completed: false };
    console.log(` Creating new task with title: ${newTask.title}`);
    const createResponse = await request.post(BASE_URL, { data: newTask });
    expect(createResponse.status()).toBe(201);
    const newTaskId = (await createResponse.json())._id;
    console.log(` New task created with ID: ${newTaskId}`);

    console.log(` Deleting the new task with ID: ${newTaskId}`);
    const deleteResponse = await request.delete(`${BASE_URL}/${newTaskId}`);
    expect(deleteResponse.status()).toBe(204);
    console.log(` New task successfully deleted.`);

    //  Retrieve task count again
    console.log(` Retrieving task count after create-delete sequence...`);
    const finalResponse = await request.get(BASE_URL);
    const finalTasks = await finalResponse.json();
    const finalCount = finalTasks.length;
    console.log(` Final task count: ${finalCount}`);

    //  Relation Check
    console.log(` Checking relation: final task count should equal initial task count (${seedCount})`);
    expect(finalCount).toBe(seedCount);
    if (finalCount === seedCount) {
        console.log(` MR8 PASSED: Task count is unchanged after create-delete cancellation.`);
    } else {
        console.log(` MR8 FAILED: Expected task count ${seedCount}, but got ${finalCount}.`);
    }
});





test('MR9: Calling DELETE /all twice should be safe and idempotent', async ({ request }) => {
    console.log(`\n **MR9: Calling DELETE /all twice should be safe and idempotent**`);

    //  Seed Input: First DELETE /all
    const firstDelete = await request.delete(`${BASE_URL}/all`);
    expect(firstDelete.status()).toBe(204);
    console.log(` Seed Input: First DELETE /all (status: ${firstDelete.status()})`);

    //  Seed Output: Check system state
    const checkFirst = await request.get(BASE_URL);
    const tasksAfterFirst = await checkFirst.json();
    console.log(` Seed Output: Tasks after first delete: ${tasksAfterFirst.length}`);
    expect(tasksAfterFirst.length).toBe(0);

    //  Transformation (Morphed Input): Second DELETE /all
    const secondDelete = await request.delete(`${BASE_URL}/all`);
    expect(secondDelete.status()).toBe(204);
    console.log(` Morphed Input: Second DELETE /all (status: ${secondDelete.status()})`);

    //  Morphed Output: Check system state again
    const checkSecond = await request.get(BASE_URL);
    const tasksAfterSecond = await checkSecond.json();
    console.log(` Morphed Output: Tasks after second delete: ${tasksAfterSecond.length}`);

    //  Relation Check
    expect(tasksAfterSecond.length).toBe(0);
    if (tasksAfterSecond.length === 0) {
        console.log(` MR9 PASSED: System state unchanged after both deletes.`);
    } else {
        console.log(` MR9 FAILED: Task count mismatch.`);
    }
});


test('MR10: Update non-existent task should return 404 and not affect existing tasks', async ({ request }) => {
    console.log(`\n **MR10: Update non-existent task should return 404 and not affect existing tasks**`);

    // 🔹 Seed Input: Create a valid task
    const seedTask = { title: `MR10-Task-${Date.now()}`, priority: "Medium", completed: false };
    console.log(` Seed Input:`, seedTask);
    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    const validTaskId = (await seedResponse.json())._id;
    expect(seedResponse.status()).toBe(201);

    // 🔹 Seed Output: Retrieve the task state
    const seedOutput = await request.get(`${BASE_URL}/${validTaskId}`).then(res => res.json());
    console.log(` Seed Output:`, seedOutput);

    // 🔹 Transformation: Attempt to update a non-existent task ID
    const nonExistentId = 'ffffffffffffffffffffffff';
    const morphedUpdate = { title: "MR10-Updated-Title" };
    console.log(` Morphed Input: Attempting update on ID ${nonExistentId}`, morphedUpdate);
    const morphedResponse = await request.put(`${BASE_URL}/${nonExistentId}`, { data: morphedUpdate });
    console.log(`- Morphed Response Status: ${morphedResponse.status()}`);
    expect(morphedResponse.status()).toBe(404);

    // 🔹 Morphed Output: Retrieve original task to ensure it's unchanged
    const morphedOutput = await request.get(`${BASE_URL}/${validTaskId}`).then(res => res.json());
    console.log(` Morphed Output:`, morphedOutput);

    // 🔹 Relation Check
    const isUnchanged = JSON.stringify(morphedOutput) === JSON.stringify(seedOutput);
    if (isUnchanged) {
        console.log(` MR10 PASSED: Non-existent update didn't affect the existing task.`);
    } else {
        console.log(` MR10 FAILED: Original task was unexpectedly changed.`);
    }

    expect(isUnchanged).toBe(true);
});

test('MR11: Delete non-existent task should return 404 and not affect existing tasks', async ({ request }) => {
    console.log(`\n **MR11: Delete non-existent task should return 404 and not affect existing tasks**`);

    // 🔹 Seed Input: Create a valid task
    const seedTask = { title: `MR11-Task-${Date.now()}`, priority: "Low", completed: false };
    console.log(` Seed Input:`, seedTask);
    const seedResponse = await request.post(BASE_URL, { data: seedTask });
    const validTaskId = (await seedResponse.json())._id;
    expect(seedResponse.status()).toBe(201);

    // 🔹 Seed Output: Retrieve the task state
    const seedOutput = await request.get(`${BASE_URL}/${validTaskId}`).then(res => res.json());
    console.log(` Seed Output:`, seedOutput);

    // 🔹 Transformation: Attempt to delete a non-existent task ID
    const nonExistentId = 'eeeeeeeeeeeeeeeeeeeeeeee';
    console.log(` Morphed Input: Attempting delete on ID ${nonExistentId}`);
    const morphedResponse = await request.delete(`${BASE_URL}/${nonExistentId}`);
    console.log(`- Morphed Response Status: ${morphedResponse.status()}`);
    expect(morphedResponse.status()).toBe(404);

    // 🔹 Morphed Output: Retrieve original task to ensure it's unchanged
    const morphedOutput = await request.get(`${BASE_URL}/${validTaskId}`).then(res => res.json());
    console.log(` Morphed Output:`, morphedOutput);

    // 🔹 Relation Check
    const isUnchanged = JSON.stringify(morphedOutput) === JSON.stringify(seedOutput);
    if (isUnchanged) {
        console.log(` MR11 PASSED: Non-existent delete didn't affect the existing task.`);
    } else {
        console.log(` MR11 FAILED: Original task was unexpectedly changed.`);
    }

    expect(isUnchanged).toBe(true);
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
