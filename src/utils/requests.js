import departments from './departments'

// Получает список филиалов 
const GetDepartments = () => {
    return departments
}

const CreateRouteRequest = (type, department) => {
    if (type === "walk") {
        return department['route_walk']
    }
    return department['route_drive']
}

export { CreateRouteRequest, GetDepartments }