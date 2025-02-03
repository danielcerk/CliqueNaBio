"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Globe, MapPin, ImageIcon, Type } from "lucide-react"
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from "@react-google-maps/api"
import Image from "next/image"


const containerStyle = {
  width: '100%',
  height: '300px',
}


interface ContentItem {
  id: string
  type: "link" | "photo" | "text"
  content: string
  url?: string
}

interface BioData {
  name: string
  username: string
  bio: string
  profilePicture: string
  content: ContentItem[]
  location: string
}

interface BioEditorProps {
  onSave: (data: BioData) => void
  initialData: BioData
}


const BioEditor: React.FC<BioEditorProps> = ({ onSave }) => {
  const [bioData, setBioData] = useState<BioData>({
    name: "",
    username: "",
    bio: "",
    profilePicture: "https://via.placeholder.com/150",
    content: [],
    location: "",
  })

    // useEffect(() => {
  //   setBioData(initialData)
  // }, [initialData])


  const [mapPosition, setMapPosition] = useState({ lat: -34.397, lng: 150.644 }) // Coordenadas iniciais (exemplo)



  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',  // Substitua pela sua chave de API
    libraries: ['places'],
  });
  
  // Verifique se o mapa já foi carregado antes de renderizar o componente
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    setMapPosition(e.latLng?.toJSON() || mapPosition)
    setBioData({ ...bioData, location: `Latitude: ${e.latLng?.lat()}, Longitude: ${e.latLng?.lng()}` })
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBioData({ ...bioData, [e.target.id]: e.target.value })
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          setBioData({ ...bioData, profilePicture: event.target.result as string })
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const addContent = (type: "link" | "photo" | "text") => {
    const newContent: ContentItem = { id: Date.now().toString(), type, content: "", url: "" }
    setBioData({ ...bioData, content: [...bioData.content, newContent] })
  }

  const updateContent = (id: string, content: string, url?: string) => {
    const updatedContent = bioData.content.map((item) =>
      item.id === id ? { ...item, content, url: url || item.url } : item,
    )
    setBioData({ ...bioData, content: updatedContent })
  }

  const removeContent = (id: string) => {
    const updatedContent = bioData.content.filter((item) => item.id !== id)
    setBioData({ ...bioData, content: updatedContent })
  }

  const handlePhotoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) {
          updateContent(id, event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleSave = () => {
    console.log("Saving from BioEditor:", bioData)
    onSave(bioData)
  }

  return (
    <div className="max-w-6xl mx-auto px-10">
      <div className="min-h-screen">
        <div className="py-5 rounded-3xl flex flex-col lg:flex-row gap-5">
          <div className="flex h-fit bg-gray-900 rounded-xl shadow-xl p-5 flex-col lg:w-1/3">
            <button onClick={() => document.getElementById("upload-photo-perfil")?.click()}>
              <input id="upload-photo-perfil" type="file" className="hidden" onChange={handleProfilePictureChange} />
              <Image
                src={bioData.profilePicture || "/placeholder.svg"}
                alt="Foto de Perfil"
                className="w-32 h-32 mx-auto lg:mx-0 rounded-full object-cover border-4 border-yellow-500"
                width={150}
                height={150}
              />
            </button>
            <div className="mt-5">
              <Input
                type="text"
                id="name"
                className="text-2xl font-semibold"
                placeholder="Nome de usuário.."
                value={bioData.name}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                id="username"
                className="text-sm text-gray-500 mt-2"
                placeholder="@username"
                value={bioData.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Textarea
                id="bio"
                className="w-full p-3 mt-5 rounded-md"
                rows={3}
                placeholder="Escreva sobre você..."
                value={bioData.bio}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="lg:w-2/3 flex flex-col items-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <Card className="cursor-pointer" onClick={() => addContent("link")}>
                <CardContent className="flex items-center justify-center h-24">
                  <PlusCircle className="w-8 h-8" />
                  <span className="ml-2">Add Link</span>
                </CardContent>
              </Card>

              <Card className="cursor-pointer" onClick={() => addContent("photo")}>
                <CardContent className="flex items-center justify-center h-24">
                  <ImageIcon className="w-8 h-8" />
                  <span className="ml-2">Add Photo</span>
                </CardContent>
              </Card>

              <Card className="cursor-pointer" onClick={() => addContent("text")}>
                <CardContent className="flex items-center justify-center h-24">
                  <Type className="w-8 h-8" />
                  <span className="ml-2">Add Text</span>
                </CardContent>
              </Card>


              {/* <Card>
                <CardContent className="flex flex-col items-center justify-center h-24">
                  <MapPin className="w-8 h-8 mt-2" />
                  <Input
                    id="location"
                    type="text"
                    className="mt-2"
                    placeholder="Sua localização"
                    value={bioData.location}
                    onChange={handleInputChange}
                  />
                </CardContent>
              </Card> */}

              <Card>
                <CardContent className="flex flex-col items-center justify-center h-24">
                  <MapPin className="w-8 h-8 mt-2" />
                  <Input
                    id="location"
                    type="text"
                    className="mt-2"
                    placeholder="Sua localização"
                    value={bioData.location}
                    onChange={handleInputChange}
                  />
                </CardContent>
              </Card>

              {/* <Card>
                <CardContent className="h-80">
              
                  {isLoaded ? (
                    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                      <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={mapPosition}
                        zoom={10}
                        onClick={handleMapClick}
                      >
                        <Marker position={mapPosition} />
                      </GoogleMap>
                    </LoadScript>
                  ) : (
                    <div>Carregando mapa...</div>
                  )}
                </CardContent>
              </Card> */}
            </div>

            <div className=" mt-5 lg:columns-3 gap-5 ">
              {bioData.content.map((item) => (
                  <Card key={item.id} className="mb-5 py-2 w-fit h-fit card-content card-with-link">
                    <CardContent className="flex flex-col items-center justify-between">
                      {item.type === "link" && (
                        <>
                          <Globe className="w-8 h-8" />
                          <Input
                            type="url"
                            className="mt-2"
                            placeholder="https://example.com"
                            value={item.url}
                            onChange={(e) => updateContent(item.id, item.content, e.target.value)}
                          />
                        </>
                      )}
                      {item.type === "photo" && (
      
                        <div className="flex flex-col items-center justify-center">
                          <ImageIcon className="w-8 h-8" />
                          
                          {/* Botão de upload de foto, estilizado com uma aparência personalizada */}
                          <label htmlFor={`file-input-${item.id}`} className="cursor-pointer text-center">
                            <span className="text-gray-900 ">Clique para enviar<br/>uma imagem</span>
                          </label>
                          
                          {/* Input de arquivo oculto */}
                          <input
                            id={`file-input-${item.id}`}
                            type="file"
                            className="hidden"
                            onChange={(e) => handlePhotoUpload(item.id, e)}
                          />
                        </div>
    
                     
                      )}
                      {item.type === "text" && (
                        <>
                          <Type className="w-fit" />
                          <Textarea
                            className="mt-2"
                            placeholder="Enter your text here"
                            value={item.content}
                            onChange={(e) => updateContent(item.id, e.target.value)}
                          />
                        </>
                      )}
                      <Button variant="destructive" size="sm" className="mt-2" onClick={() => removeContent(item.id)}>
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
            <Button className="mt-8" onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BioEditor

