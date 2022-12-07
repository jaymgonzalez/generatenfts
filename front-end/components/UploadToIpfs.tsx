// const extension = function ()

export default function UploadToIpfs({ imagesURLs, imageData }) {
  const files = []
  imagesURLs.map((img) => {
    const imgData = imageData.find((data) => data.url === img)
    const file = new File([img], imgData.name, {
      type: `image/${imgData.extension}`,
    })
    files.push(file)
  })
  console.log(files)

  return (
    <>
      <div>Holi</div>
    </>
  )
}
