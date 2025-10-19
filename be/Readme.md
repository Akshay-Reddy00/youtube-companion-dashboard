# Youtube Companion Dashboard

## Api Endpoints
- All routes are protected except `/auth/login` and `/auth/register` require a JWT token in Authorization header
    - `Authorization: Bearer <token>`
- ### Auth Routes
    - POST - `/auth/register/` - Register a new user
    - POST - `/auth/login` - Login and return JWT

- ### Video Routes
    - GET - `/videos` - Fetch all videos
    - POST - `/videos` - Add a new vide
    - GET - `/videos/:id` - get a specific video by ID
    - DELETE - `/videos/:id` - Delete a video

- ### Comment Routes
    - GET - `/comments/:videoId` - Get comments for a video
    - POST - `/comments` - Add a comment
    - POST - `/comments/reply` - Reply to a comment
    - DELETE - `/comments/:id` - Delete a comment

- ### Note Routes
    - GET - `/notes/:videoId` - Get notes for a specific video
    - POST - `/notes` - Add a new note
    - DELETE - `/notes/:id` - Delete a note

## Database Schema
    
- ### User
    - name: string(req)
    - email: string(req, unique)
    - password: string (required)
    - timestamps: createdAt, updatedAt

- ### Video
    - videoId: string (required)
    - user: ObjectId reference to User (required)
    - title: string (optional) 
    - description: string (optional) 
    - thumbnails: object (optional)
    - timestamps: createdAt, updatedAt

- ### Comment
    - video: ObjectId reference to Video (required)
    - user: ObjectId reference to User (required)
    - parentId: ObjectId reference to Comment (nullable, for replies)
    - text: string (required)
    - timestamps: createdAt, updatedAt

- ### Note
    - video: ObjectId reference to Video (required)
    - user: ObjectId reference to User (required)
    - text: string (required)
    - tags: array of strings (optional)
    - timestamps: createdAt, updatedAt


