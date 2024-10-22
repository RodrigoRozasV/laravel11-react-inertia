import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from '@/constants.jsx'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import TableHeading from '@/Components/TableHeading'

const Index = ({auth, projects, queryParams = null}) => {
    queryParams = queryParams || {}
    const searchFieldChanged = (name, value) =>{
        if (value) {
            queryParams[name] = value
        }else{
            delete queryParams[name]
        }
        router.get(route('project.index'), queryParams)
    }

    const onKeyPress = (name, e) =>{
        e.preventDefault()
        if(e.key !== 'Enter') return
        searchFieldChanged(name, e.target.value)
    }

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if(queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc'
            }else{
                queryParams.sort_direction = 'asc'
            }
        }else{
            queryParams.sort_field = name
            queryParams.sort_direction = 'asc'
        }
        router.get(route('project.index'), queryParams)
    }

    return (
    <AuthenticatedLayout
    user={auth.user}
    header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Proyectos
        </h2>
    }
    >
        <Head title="Proyectos" />
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className='overflow-auto'>
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500'>
                                    <tr className='text-nowrap text-center'>
                                        <TableHeading 
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            ID
                                        </TableHeading>
                                        <th className='px-3 py-3'>Imagen</th>
                                        <TableHeading 
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Nombre
                                        </TableHeading>
                                        <TableHeading 
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Estado
                                        </TableHeading>
                                        <TableHeading 
                                            name="created_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Fecha de Creación
                                        </TableHeading>
                                        <TableHeading 
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >
                                            Fecha de Vencimiento
                                        </TableHeading>
                                        <th className='px-3 py-3'>Creador</th>
                                        <th className='px-3 py-3'>Acciones</th>
                                    </tr>
                                    <tr className='text-nowrap bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <th className='px-3 py-3'></th>
                                        <th className='px-3 py-3'></th>
                                        <th className='px-3 py-3'>
                                            <TextInput 
                                                className="w-full"
                                                defaultValue={queryParams.name}
                                                placeholder="Nombre del Proyecto"
                                                onBlur={e=>searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e=>onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className='px-3 py-3'>
                                            <SelectInput  
                                                className="w-full"
                                                defaultValue={queryParams.status}
                                                onChange={e=>searchFieldChanged('status', e.target.value)}
                                            >
                                                <option value="">Seleccione: </option>
                                                <option value="pending">Pendiente</option>
                                                <option value="in_progress">En Progreso</option>
                                                <option value="completed">Completado</option>
                                            </SelectInput>
                                        </th>
                                        <th className='px-3 py-3'></th>
                                        <th className='px-3 py-3'></th>
                                        <th className='px-3 py-3'></th>
                                        <th className='px-3 py-3'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map(project =>(
                                        <tr key={project.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                            <td className='px-3 py-2'>{project.id}</td>
                                            <td className='px-3 py-2'>
                                                <img src={project.image_path} style={{width:60}}/>
                                            </td>
                                            <td className='px-3 py-2'>{project.name}</td>
                                            <td className='px-3 py-2 text-center'>
                                                <span 
                                                    className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}
                                                >
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                            </td>
                                            <td className='px-3 py-2 text-center'>{project.created_at}</td>
                                            <td className='px-3 py-2 text-center'>{project.due_date}</td>
                                            <td className='px-3 py-2'>{project.createdBy.name}</td>
                                            <td className='px-3 py-2'>
                                                <Link href={route('project.edit', project.id)} className='font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'>
                                                    Editar
                                                </Link>
                                                <Link href={route('project.destroy', project.id)} className='font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>
                                                    Eliminar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={projects.meta.links} />
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}

export default Index