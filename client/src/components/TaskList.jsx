import { useEffect, useState } from "react";
import { getAllTask } from "../api/task.api";
import {TaskCard} from "./TaskCard"
export function TaskList() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        async function loadTask() {
            const res = await getAllTask();
            setTasks(res.data);
        }
        loadTask();
    }, []);

    return <div>
        {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
        ))}
    </div>;
}
