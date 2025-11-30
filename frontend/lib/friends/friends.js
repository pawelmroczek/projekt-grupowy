import { ipAddress, ipAddressNginx } from "../ipAddress.js";

export const getUsers = async (token, username) => {
    try {
      const response = await fetch(ipAddress+"/fashion/users/"+ username , {
          method: "GET",
          headers: {
              "Authentication": `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();   
      data.forEach(user => {
        if(user.avatar){   
            const parts = user.avatar.split("images-server:80");
            user.avatar = ipAddressNginx + parts[1];
        }
      });
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
}

export const iviteSending = async (token, id, type) => {
    try {
      const response = await fetch(ipAddress+"/fashion/invitations/send", {
          method: "POST",
          headers: {
              "Authentication": `Bearer ${token}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              toUser: id,
              type: type
          })
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      //const data = await response.json();
      return 1;
    } catch (error) {
      console.error('Błąd:', error);
    }
  }

export const getInvites = async (token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/invitations" , {
          method: "GET",
          headers: {
              "Authentication": `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      data.forEach(invite => {
        if(invite.fromUserAvatar){   
            const parts = invite.fromUserAvatar.split("images-server:80");
            invite.fromUserAvatar = ipAddressNginx + parts[1];
        }
      });
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
}

export const acceptInvite = async (token, id) => {
    try {
      const response = await fetch(ipAddress+"/fashion/invitations/accept/"+id , {
          method: "POST",
          headers: {
              "Authentication": `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      return;
    } catch (error) {
      console.error('Błąd:', error);
    }
}

export const rejectInvite = async (token, id) => {
    try {
      const response = await fetch(ipAddress+"/fashion/invitations/reject/"+id , {
          method: "POST",
          headers: {
              "Authentication": `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      return;
    } catch (error) {
      console.error('Błąd:', error);
    }
}

export const getFriendsList = async (token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/friends", {
          method: "GET",
          headers: {
              "Authentication": `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();   
      data.forEach(user => {
        if(user.avatar){
            const parts = user.avatar.split("images-server:80");
            user.avatar = ipAddressNginx + parts[1];
        }
      });
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
}

export const getHomiesList = async (token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/household", {
          method: "GET",
          headers: {
              "Authentication": `Bearer ${token}`
          }
      });
      if (!response.ok) {
          return [];
      }
      const data = await response.json();
      data.forEach(user => {
        if(user.avatar){
            const parts = user.avatar.split("images-server:80");
            user.avatar = ipAddressNginx + parts[1];
        }
      });
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
}

export const leaveHousehold = async (token) => {
  try {
    const response = await fetch(ipAddress + "/fashion/household/leave", {
      method: "POST",
      headers: {
        "Authentication": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return [];
    }

    const text = await response.text();
    if (!text) return []; 

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('Błąd:', error);
    return [];
  }
}

export const deleteFriend = async (token, friendId) => {
  try {
    const response = await fetch(ipAddress + "/fashion/friends/" + friendId, {
      method: "DELETE",
      headers: {
        "Authentication": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      return [];
    }

    const text = await response.text();
    if (!text) return []; 

    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.error('Błąd:', error);
    return [];
  }
}


export const getUserInfo = async (token) => {
    try {
      const response = await fetch(ipAddress+"/fashion/users/info", {
          method: "GET",
          headers: {
              "Authentication": `Bearer ${token}`
          }
      });
      if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
      }
      const data = await response.json();
      if(data.avatar){   
        const parts = data.avatar.split("images-server:80");
        data.avatar = ipAddressNginx + parts[1];
      }
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
}
