import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask , updateTask, getTask} from '../api/task.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';



export function TaskFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const navigate = useNavigate();
    const params = useParams();

    //Preguntar si esta creando o actualizando
    const onSubmit = handleSubmit(async data => {
        if (params.id) {
           await updateTask(params.id, data);
           toast.success('Registro actualizado con exito',{
            position: "bottom-right",
            style:{
                background: '#101010',
                color: '#fff'
            }
        });
        } else {
            await createTask(data);
            toast.success('Registro realizado con exito',{
                position: "bottom-right",
                style:{
                    background: '#101010',
                    color: '#fff'
                }
            });
            
        }
        navigate("/tasks");

    });

    //Cargamos los datos cuando se muestre la pagina
    useEffect(()=>{
        async function loadTask() {
            if (params.id) {
               const {data:{title,description}} =  await getTask(params.id);   
               setValue('title',title);
               setValue('description',description);     
            }
        }
        loadTask()
    })
    return (
        //Formulario 
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input type="text"
                    placeholder="Title"
                    {...register("title", { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />
                {errors.title && <span>Title is required</span>}
                <textarea rows="3"
                    placeholder="Description"
                    {...register("description", { required: true })}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                ></textarea>
                {errors.description && <span>Description is required</span>}
                <button className='bg-lime-500 p-3 rounded-lg block w-full mt-3' type="submit">Save</button>

            </form>
            {params.id &&
                <div className='flex justify-end'>
                <button className='bg-red-500 p-3 rounded-lg w-48 mt-3 hover:bg-slate-400' onClick={async () => {
                //Se muestra el boton eliminar si el params.id  contiene registros
                //Preguntamos si esta seguro que desea eliminar el registro
                const accepted = window.confirm('Are you sure?');
                if (accepted) {
                    await deleteTask(params.id);
                    toast.success('Registro eliminado con exito',{
                        position: "bottom-right",
                        style:{
                            background: '#101010',
                            color: '#fff'
                        }
                    });
                    navigate("/tasks");
                }
            }
            }>Delete</button>
                </div>
            }
        </div>

    )
}