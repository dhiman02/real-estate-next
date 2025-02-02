import User from '../models/user.model';
import { connect } from '../mongodb/mongoose';

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses?.[0]?.email_address || '',
        },
      },
      { upsert: true, new: true }
    );

    // Convert Mongoose document to plain JavaScript object
    return user ? user.toObject() : null; // Ensure returning a plain object
  } catch (error) {
    console.error('Error: Could not create or update user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    const result = await User.findOneAndDelete({ clerkId: id });
    return result ? result.toObject() : null; // Ensure returning a plain object
  } catch (error) {
    console.error('Error: Could not delete user:', error);
    throw error;
  }
};
