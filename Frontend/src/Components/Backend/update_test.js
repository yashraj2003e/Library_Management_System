async function fetchData() {
  try {
    const response = await fetch("http://127.0.0.1:8083/update-item", {
      method: "PATCH",
      body: JSON.stringify({
        id: "5",
        name: "Deep Learning Techniques",
        author: "The Fuck Dude !",
        cost: "$ 500",
        text: "This book is useful for anyone trying to learn Deep Learning",
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
    console.log("Cannot Update !");
  }
}

fetchDataAndLog();
