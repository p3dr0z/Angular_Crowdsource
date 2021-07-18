export interface Place {
    _id?: String,
    name: String,
    category: String,
    address: String,
    user: String,
    usersLiked: Array<String>,
    usersDisliked: Array<String>
}