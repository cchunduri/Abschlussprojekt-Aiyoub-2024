import {Router} from "express";
import {dbConfig} from "../server";

export const commentsRouter = Router();

commentsRouter.post('/:postId', async (req: any, res) => {
    try {
        const commentData = {
            content: req.body.content,
            post_id: req.params.postId,
            user_id: req.body.userId
        };

        const query = `
            INSERT INTO comments (content, post_id, user_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [commentData.content, commentData.post_id, commentData.user_id];
        const result = await dbConfig.pool().query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create comment error:', error);
        res.status(500).json({ error: 'Error creating comment' });
    }
});

// Route to get comments for a specific post
commentsRouter.get('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        const query = `
            SELECT comments.id,
                   comments.content,
                   weblogusers.username as commentAuthor,
                   weblogusers.email    as commentAuthorEmail
            FROM comments
                     JOIN weblogusers ON comments.user_id = weblogusers.id
            WHERE comments.post_id = $1
            ORDER BY comments.created_at ASC
        `;
        const values = [postId];
        const result = await dbConfig.pool().query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({message: 'No comments found for this post'});
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Get comments error:', error);
        res.status(500).json({error: 'Error fetching comments'});
    }
});