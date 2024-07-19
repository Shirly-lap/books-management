// Interface for the login request structure
export interface BodyRequestLogin {
    email: string,
    password : string
}

// Interface for the login response structure

export interface BodyResponseLogin{
    message: string, // Text message describing the response
    data : Record <string, string> // Object with key-value pairs of type string
}