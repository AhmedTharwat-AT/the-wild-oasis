import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  //get session from local storage , If the session has an expired access token, this method will use the refresh token to get a new session.
  //If the current session's refresh token is invalid, an error will be thrown.
  const { data: session } = await supabase.auth.getSession();

  // make use log in again if there is no session in local storage
  if (!session?.session) return null;

  //This method fetches the user object from the database instead of local session.
  //This method is useful for checking if the user is authorized because it validates the user's access token JWT on the server.
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. update pass or fullname
  let updataData;
  if (password) updataData = { password };
  if (fullName) updataData = { data: { fullName } };

  const { error, data } = await supabase.auth.updateUser(updataData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  // 2. upload avatar img
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. update avatar in user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
