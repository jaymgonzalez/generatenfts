// const extension = function ()

export default function UploadToIpfs({ imagesURLs, imageData }) {
  let files
  imagesURLs.map((img, i) => {
    const imgData = imageData.filter((data) => data.url === img)
    console.log(imgData)

    const file = new File([img], `${i}.${0}`)
  })

  return files
}
