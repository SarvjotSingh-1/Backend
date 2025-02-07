import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user already exists: username , email
  // check for images, check for avatar
  //upload them to cloudinary, avatar
  // create user object - create entery in db
  //remove password and  refresh token fiel from response
  //check for user creation
  //return res

  const { fullName, username, email, password } = req.body;

  //   if(fulnName === ""){
  //     throw new ApiError(400,"Full name is required");
  //   }

  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const exitedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (exitedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path; //ye dono local path denge

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }

  //upload images to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase(),
    email,
    password,
  });

  //   const createdUser = await user
  //     .findById(user._id)
  //     .select("-password -refreshToken");

  const createdUser = await User.findById(user._id) // Use the model `User` here
    .select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong While Registering the User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user refister Successfully"));
});

export { registerUser };
