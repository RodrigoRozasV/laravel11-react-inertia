import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from "@inertiajs/react";
import React from 'react'

const Create = ({auth}) => {
    const {data, setData, post, errors, reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: '',
    })

    const onSubmit = (e) => {
        e.preventDefault()
        post(route("project.store"))
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Crear un nuevo Proyecto
                </h2>
                </div>
            }
        >
            <Head title="Proyectos" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            encType='multipart/form-data'
                        >
                            <div>
                                <InputLabel
                                    htmlFor="project_image_path"
                                    value="Imagen del Proyecto"
                                />
                                <TextInput
                                id="project_image_path"
                                type="file"
                                name="image"
                                className="mt-1 block w-full"
                                onChange={(e) => setData("image", e.target.files[0])}
                                />
                                {console.log(data)}
                                <InputError message={errors.image} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="project_name" value="Nombre del Proyecto" />
                
                                <TextInput
                                id="project_name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) => setData("name", e.target.value)}
                                />
                
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                htmlFor="project_description"
                                value="Descripción del Proyecto"
                                />
                
                                <TextAreaInput
                                id="project_description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("description", e.target.value)}
                                />
                
                                <InputError message={errors.description} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                htmlFor="project_due_date"
                                value="Fecha Limite del Proyecto"
                                />
                
                                <TextInput
                                id="project_due_date"
                                type="date"
                                name="due_date"
                                value={data.due_date}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("due_date", e.target.value)}
                                />
                
                                <InputError message={errors.due_date} className="mt-2" />
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="project_status" value="Estado del Proyecto" />
                
                                <SelectInput
                                name="status"
                                id="project_status"
                                className="mt-1 block w-full"
                                onChange={(e) => setData("status", e.target.value)}
                                >
                                <option value="">Seleccione Estado: </option>
                                <option value="pending">Pendiente</option>
                                <option value="in_progress">En Progreso</option>
                                <option value="completed">Completado</option>
                                </SelectInput>
                
                                <InputError message={errors.project_status} className="mt-2" />
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                href={route("project.index")}
                                className="bg-red-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-red-700 mr-2"
                                >
                                    Cancelar
                                </Link>
                                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
          </div>
        </AuthenticatedLayout>
      );
}

export default Create