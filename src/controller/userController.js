import { prisma } from '../../lib/prisma';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (findUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password
      }
    });

    res.status(201).json({
      data: newUser,
      message: "User created successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create user"
    });
  }
};

// show users
export const showUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        _count: {
          select: {
            posts: true,
            comments: true
          }
        }
      }
    });

    res.status(200).json({
      User: users,
      message: "Users fetched successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch users"
    });
  }
};



// show user by id
export const userbyId = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await prisma.user.findMany({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        _count: {
          select: {
            posts: true,
            comments: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      data: user,
      message: "User fetched successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch user"
    });
  }
};

// delete user 
export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = await prisma.user.delete({
      where: { id }
    });

    res.status(200).json({
      data: deletedUser,
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};


// update user 

export const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (!Number.isInteger(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: req.body.name,
        email: req.body.email,
      }
    });
    res.status(200).json({
      data: updatedUser,
      message: "User updated successfully"
    });

  }
  catch (error) {

  }
}