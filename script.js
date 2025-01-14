document
  .getElementById("uploadBtn")
  .addEventListener("click", async function () {
    const imgFile = document.getElementById("imgFile");
    const file = imgFile.files[0];
    const apiUrl = "https://api.ocr.space/parse/image";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");
    formData.append("OCREngine", "2");

    axios
      .post(apiUrl, formData, {
        headers: {
          apikey: "K85919886888957",
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        let text = response.data.ParsedResults[0].ParsedText;
        document.getElementById("result").innerText = text;
        fetch(
          `https://api.mymemory.translated.net/get?q=${text}&langpair=en|es&key=d9c97c6daf2d512df57d`
        )
          .then((response) => response.json())
          .then((data) => {
            let Rdata = data.responseData.translatedText;
            document.getElementById("result_").innerText = Rdata;
          })
          .catch((error) => {
            console.error("Error al obtener los datos:", error);
          });
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  });

document.getElementById("imgFile").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewImage = document.getElementById("previewImage");
      previewImage.src = e.target.result;
      previewImage.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});
