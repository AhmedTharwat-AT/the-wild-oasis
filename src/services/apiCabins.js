import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select();
  if (error) {
    console.log(error.message);
    throw new Error("Cabins couldnt be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // console.log(newCabin, id);
  const hasImagePath = newCabin.image?.startsWith?.("https://");
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `https://zeclijdfypmmytzbwvhn.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

  // create / edit a cabin
  let query = supabase.from("cabins");

  // a) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b) edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error.message);
    throw new Error("Cabins couldnt be created");
  }

  // Upload image when editing with a new image or creating a new cabin
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.log(storageError.message);
      await supabase.from("cabins").delete().eq("id", data.id);
      throw new Error(
        "Cabins image couldnt be uploaded so the cabin wasn't created"
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  console.log("delete cabin number", id);

  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Cabins couldnt be deleted");
  }

  return "done deleting";
}
