// const Post = require("../models/Post");

// class PostController {
//   // image upload
//   static async createPost(req, res) {
//     try {
//       const post = await Post.create({
//         title: req.body.title,
//         content: req.body.content,
//         image: req.body.image,
//       });

//       res.status(201).json({
//         message: "Post created successfully",
//         success: true,
//         data: { post },
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Error creating post",
//         success: false,
//         error: error.message,
//       });
//     }
//   }

//   // CREATE POST
//   static async createPost(req, res) {
//     try {
//       const post = await Post.create(req.body);

//       res.status(201).json({
//         message: "Post created successfully",
//         success: true,
//         data: { post },
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Error creating post",
//         success: false,
//         error: error.message,
//       });
//     }
//   }

//   // GET POSTS
//   static async getPosts(req, res) {
//     try {
//       const posts = await Post.find().sort({ updatedAt: -1 });

//       res.status(200).json({
//         message: "Posts fetched successfully",
//         success: true,
//         data: { posts },
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Error fetching posts",
//         success: false,
//         error: error.message,
//       });
//     }
//   }

//   // UPDATE POST
//   static async updatePost(req, res) {
//     try {
//       const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
//         returnDocument: "after",
//       });

//       if (!post) {
//         return res.status(404).json({
//           message: "Post not found",
//           success: false,
//         });
//       }

//       res.status(200).json({
//         message: "Post updated successfully",
//         success: true,
//         data: { post },
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Error updating post",
//         success: false,
//         error: error.message,
//       });
//     }
//   }

//   // DELETE POST
//   static async deletePost(req, res) {
//     try {
//       const post = await Post.findByIdAndDelete(req.params.id);

//       if (!post) {
//         return res.status(404).json({
//           message: "Post not found",
//           success: false,
//         });
//       }

//       res.status(200).json({
//         message: "Post deleted successfully",
//         success: true,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: "Error deleting post",
//         success: false,
//         error: error.message,
//       });
//     }
//   }
// }

// module.exports = PostController;

const Post = require("../models/Post");

class PostController {
  // CREATE POST
  static async createPost(req, res) {
    try {
      const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        image: req.body.image || "defaultimage.jpg",
        user: req.body.user, //  reference id
      });

      res.status(201).json({
        message: "Post created successfully",
        success: true,
        data: { post },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating post",
        success: false,
        error: error.message,
      });
    }
  }

  // GET POSTS
  static async getPosts(req, res) {
    try {
      const posts = await Post.find()
        .populate("user", "email") //  JOIN / REF
        .sort({ updatedAt: -1 });

      res.status(200).json({
        message: "Posts fetched successfully",
        success: true,
        data: { posts },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching posts",
        success: false,
        error: error.message,
      });
    }
  }

  // UPDATE POST
  static async updatePost(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        returnDocument: "after",
      });

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
          success: false,
        });
      }

      res.status(200).json({
        message: "Post updated successfully",
        success: true,
        data: { post },
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating post",
        success: false,
        error: error.message,
      });
    }
  }

  // DELETE POST
  static async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);

      if (!post) {
        return res.status(404).json({
          message: "Post not found",
          success: false,
        });
      }

      res.status(200).json({
        message: "Post deleted successfully",
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting post",
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = PostController;
