'use server'
export async function getPeopleInfo(id:string) {
    return {
        id,
        name: 'John Doe',
    }
}