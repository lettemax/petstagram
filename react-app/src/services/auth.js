export const authenticate = async() => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  return await response.json();
}

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
};


export const signUp = async (username, email, password, profilePhotoFile) => {
  // const { images, image, username, email, password } = user;

  const formData = new FormData();
  
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);

  console.log(formData.get("email"))
  console.log(formData.get("username"))
  console.log(formData.get("password"))
  // for single file
  if (profilePhotoFile) {
    console.log(profilePhotoFile)
    formData.append("profile_photo_file", profilePhotoFile)
    console.log(formData.get("profile_photo_file"))
    console.log("Form data", formData)
  };

  let obj = {}
  
  formData.forEach((value, key) =>{
    obj[key] = value
  })

  console.log(obj)

  const response = await fetch("/api/auth/signup", {
    method: "POST",

    // Dont add a content-type header. it breaks everything
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: formData
  });
  return await response.json();
}