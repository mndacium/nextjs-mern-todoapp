export default interface ITodo{
    Id: number,
    Description: string,
    Deadline: Date,
    State: "In progress"|"Done"|"Outdated"|"Failed"
}