async function fetchData() {
  try {
    const response = await fetch("http://127.0.0.1:8084/delete-item", {
      method: "DELETE",
      body: JSON.stringify({
        id: "5",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const message = "ERROR!";
      throw new Error(message);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

async function fetchDataAndLog() {
  try {
    const result = await fetchData();
    console.log(result);
  } catch (error) {
    // Handle errors here
  }
}

fetchDataAndLog();
