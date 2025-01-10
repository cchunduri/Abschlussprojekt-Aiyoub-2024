import React, {useState} from "react";

const NewPostForm = () => {
    const [title, setTitle] = useState(""); // Post title state
    const [content, setContent] = useState(""); // Post content state
    const [tags, setTags] = useState(""); // Tags state (comma-separated strings)
    const [error, setError] = useState(null); // Error state
    const [success, setSuccess] = useState(null); // Success state

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form behavior
        setError(null); // Clear previous errors
        setSuccess(null); // Clear previous success messages

        try {
            const response = await fetch("http://localhost:5000/api/posts", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: title.trim(),
                    content: content.trim(),
                    tags: tags.split(",").map((tag) => tag.trim()),
                    user_id: localStorage.getItem('user_id')
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess("Post created successfully!");
                setTitle(""); // Reset title
                setContent(""); // Reset content
                setTags(""); // Reset tags
            } else {
                throw new Error(data.message || "Failed to create post. Please try again.");
            }
        } catch (err) {
            setError(err.message); // Set error message if something goes wrong
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create a New Post</h2>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            {/* Success Message */}
            {success && <p className="text-green-600 text-sm mb-4">{success}</p>}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                {/* Title Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Content Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your content here..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="5"
                        required
                    />
                </div>

                {/* Tags Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="e.g., productivity, motivation"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default NewPostForm;