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
        console.log("Odpowiedź serwera:", data);
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
      console.log("Odpowiedź serwera:", response);
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
        console.log("Odpowiedź serwera:", data);
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
      return data;
    } catch (error) {
      console.error('Błąd:', error);
    }
}