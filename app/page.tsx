"use client"

import { Card } from "@/components/ui/card"
import { Github, Facebook, Globe, Music, Volume2, VolumeX } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars, Trail } from "@react-three/drei"
import { useEffect, useState, useRef } from "react"
import * as THREE from "three"

function CherryBlossomsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const canvasEl = canvas
    const ctx2d = ctx

    canvasEl.width = window.innerWidth
    canvasEl.height = window.innerHeight

    interface Petal {
      x: number
      y: number
      vx: number
      vy: number
      rotation: number
      rotationSpeed: number
      size: number
      opacity: number
      color: string
    }

    const petals: Petal[] = []
    const petalCount = 30

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvasEl.width,
        y: Math.random() * canvasEl.height - canvasEl.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 1 + 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        size: Math.random() * 15 + 10,
        opacity: Math.random() * 0.5 + 0.5,
        color: `rgba(255, ${Math.floor(Math.random() * 50 + 182)}, ${Math.floor(Math.random() * 50 + 193)}, `,
      })
    }

    function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal) {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate(petal.rotation)
      ctx.globalAlpha = petal.opacity

      for (let i = 0; i < 5; i++) {
        ctx.save()
        ctx.rotate((Math.PI * 2 * i) / 5)

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(petal.size * 0.3, -petal.size * 0.5, petal.size * 0.5, -petal.size * 0.3)
        ctx.quadraticCurveTo(petal.size * 0.5, 0, 0, 0)

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, petal.size * 0.5)
        gradient.addColorStop(0, petal.color + "1)")
        gradient.addColorStop(0.5, petal.color + petal.opacity + ")")
        gradient.addColorStop(1, petal.color + "0.3)")

        ctx.fillStyle = gradient
        ctx.fill()

        ctx.restore()
      }

      ctx.beginPath()
      ctx.arc(0, 0, petal.size * 0.15, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 220, 100, ${petal.opacity})`
      ctx.fill()

      ctx.restore()
    }

    let animationFrameId: number

    function animate() {
      ctx2d.clearRect(0, 0, canvasEl.width, canvasEl.height)

      petals.forEach((petal) => {
        petal.x += petal.vx + Math.sin(petal.y * 0.01) * 0.5
        petal.y += petal.vy
        petal.rotation += petal.rotationSpeed

        if (petal.y > canvasEl.height + petal.size) {
          petal.y = -petal.size
          petal.x = Math.random() * canvasEl.width
        }

        if (petal.x > canvasEl.width + petal.size) {
          petal.x = -petal.size
        } else if (petal.x < -petal.size) {
          petal.x = canvasEl.width + petal.size
        }

        drawPetal(ctx2d, petal)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvasEl.width = window.innerWidth
      canvasEl.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-20" style={{ willChange: "transform" }} />
  )
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 500

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    const color = new THREE.Color()
    color.setHSL(Math.random() * 0.3 + 0.6, 0.8, 0.6)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  )
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Trail width={3} length={8} color="#a78bfa" attenuation={(t) => t * t}>
        <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
          <MeshDistortMaterial
            color="#8b5cf6"
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0.1}
            metalness={0.9}
            emissive="#6d28d9"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Trail>
    </Float>
  )
}

function RotatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.5
      ring1Ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -state.clock.elapsedTime * 0.4
      ring2Ref.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.5, 0.03, 16, 100]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#a78bfa" emissiveIntensity={0.3} />
      </mesh>
    </>
  )
}

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const socialLinks = [
    {
      name: "Website",
      url: "https://nguyenducthuy.id.vn",
      icon: Globe,
      color: "hover:bg-[#10b981] hover:text-white",
      gradient: "from-[#10b981] to-[#059669]",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/nducthuy7/",
      icon: Facebook,
      color: "hover:bg-[#1877F2] hover:text-white",
      gradient: "from-[#1877F2] to-[#0e5fc7]",
    },
    {
      name: "GitHub",
      url: "https://github.com/riold02",
      icon: Github,
      color: "hover:bg-[#181717] hover:text-white",
      gradient: "from-[#181717] to-[#000000]",
    },
  ]

  const skillGroups = [
    {
      title: "Languages",
      skills: ["JavaScript", "C#", "C++"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "RESTful API", "JWT", "RBAC"],
    },
    {
      title: "Database",
      skills: ["SQL Server", "Firebase", "Database Design", "Query Optimization"],
    },
    {
      title: "DevOps & Tools",
      skills: ["Docker", "Linux", "SSH", "Git"],
    },
    {
      title: "AI & Development",
      skills: ["Prompt Engineering", "AI-assisted Development"],
    },
  ]

  const nicknames = ["Matcha", "Pon", "Rio"]

  const experiences = [
    {
      role: "Backend Developer",
      period: "2025 - Present",
      summary: "Developing modular backend systems with Node.js, focused on API design and scalability.",
      highlights: ["RESTful API", "JWT/RBAC", "Clean architecture"],
    },
    {
      role: "ERP System Builder",
      period: "2025 - Present",
      summary: "Building ERP modules for HRM, finance, and recruitment with an emphasis on reliability and maintainability.",
      highlights: ["SQL Server", "Database Design", "Query Optimization"],
    },
    {
      role: "AI-assisted Developer",
      period: "2025 - Present",
      summary: "Applying AI tools in development workflows to speed up analysis, implementation, and engineering productivity.",
      highlights: ["Prompt Engineering", "Workflow Automation", "Dev Productivity"],
    },
  ]

  return (
    <>
      <audio ref={audioRef} loop>
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/N%E1%BB%A5%20h%C3%B4n%20Bisou-TBeETtWIUYWMu2lu1tBqVTQv3wlpiG.mp3"
          type="audio/mpeg"
        />
      </audio>

      <div className="fixed bottom-8 right-8 z-50 flex gap-3" style={{ willChange: "transform" }}>
        <button
          onClick={togglePlay}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="group w-14 h-14 rounded-full backdrop-blur-xl bg-card/60 border border-border/30 shadow-2xl hover:shadow-accent/50 transition-all duration-500 hover:scale-110 flex items-center justify-center hover:bg-primary/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          {isPlaying ? (
            <Music className="w-6 h-6 text-primary animate-pulse relative z-10" />
          ) : (
            <Music className="w-6 h-6 text-muted-foreground relative z-10" />
          )}
        </button>

        <button
          onClick={toggleMute}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="group w-14 h-14 rounded-full backdrop-blur-xl bg-card/60 border border-border/30 shadow-2xl hover:shadow-accent/50 transition-all duration-500 hover:scale-110 flex items-center justify-center hover:bg-primary/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-muted-foreground relative z-10" />
          ) : (
            <Volume2 className="w-6 h-6 text-primary relative z-10" />
          )}
        </button>
      </div>

      <CherryBlossomsCanvas />

      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "transform 0.05s linear",
          willChange: "transform",
        }}
      >
        <svg
          width={isHovering ? "48" : "32"}
          height={isHovering ? "48" : "32"}
          viewBox="0 0 100 100"
          className="transition-all duration-200 drop-shadow-[0_0_8px_rgba(255,182,193,0.8)]"
          style={{
            filter: "drop-shadow(0 0 8px rgba(255, 182, 193, 0.8))",
            willChange: "width, height",
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`rotate(${i * 72} 50 50)`}>
              <ellipse
                cx="50"
                cy="30"
                rx="12"
                ry="20"
                fill="#FFB6C1"
                opacity="0.9"
                style={{
                  animation: `petalPulse 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
              <ellipse cx="50" cy="30" rx="8" ry="15" fill="#FFC0CB" opacity="0.8" />
            </g>
          ))}
          <circle cx="50" cy="50" r="8" fill="#FFD700" opacity="0.9" />
          <circle cx="50" cy="50" r="5" fill="#FFA500" opacity="0.7" />
        </svg>
      </div>

      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -5]} intensity={1} color="#a78bfa" />
          <pointLight position={[10, -10, -5]} intensity={0.8} color="#c4b5fd" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />
          <Particles />
          <AnimatedSphere />
          <RotatingRings />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      <div className="fixed inset-0 -z-5 bg-gradient-to-br from-background via-background/95 to-background/90 animate-gradient" />

      <main className="min-h-screen flex items-center justify-center p-4 md:p-8 relative">
        <div className="w-full max-w-2xl">
          <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="mb-6 inline-block relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
              <div
                className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-4 border-background/50">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/z7096368504518_67e698bc6d7c53754b0ce66a8739fec7-eW06dilwIKtdxq5t4Jv1nST56jYwZF.jpg"
                  alt="Nguyễn Đức Thủy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-3 text-balance bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-100 animate-gradient-x">
              Nguyễn Đức Thủy
            </h1>

            <div className="flex items-center justify-center gap-2 flex-wrap mb-4 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200">
              {nicknames.map((nickname, index) => (
                <span
                  key={nickname}
                  className="text-muted-foreground text-lg md:text-xl font-mono hover:text-accent transition-all cursor-default hover:scale-110 hover:font-bold"
                  style={{
                    animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  {nickname}
                  {index < nicknames.length - 1 && <span className="mx-2 text-accent animate-pulse">•</span>}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-1 duration-1000 delay-300 hover:text-foreground transition-colors">
              Backend Developer (JavaScript) | System Builder | AI Explorer
            </p>
          </div>

          <Card className="p-6 md:p-8 mb-8 backdrop-blur-xl bg-card/40 border-border/30 shadow-2xl hover:shadow-accent/30 transition-all duration-500 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom duration-1000 delay-400 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-lg transition-all duration-500" />
            <h2 className="text-2xl font-semibold mb-4 text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent relative z-10">
              About
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg relative z-10">
              Backend Developer focused on Node.js ecosystem, building ERP systems and scalable architectures.
              Exploring AI-assisted workflows while keeping clean and maintainable engineering standards.
            </p>
          </Card>

          <Card className="p-6 md:p-8 mb-8 backdrop-blur-xl bg-card/40 border-border/30 shadow-2xl hover:shadow-accent/30 transition-all duration-500 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom duration-1000 delay-[450ms] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 rounded-lg transition-all duration-500" />
            <h2 className="text-2xl font-semibold mb-5 text-foreground bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent relative z-10">
              Skills
            </h2>
            <div className="grid gap-4 relative z-10">
              {skillGroups.map((group, groupIndex) => (
                <div
                  key={group.title}
                  className="rounded-xl border border-border/40 bg-background/30 p-4 hover:border-accent/40 transition-colors"
                  style={{
                    animation: `slideInRight 0.55s ease-out ${groupIndex * 0.08}s both`,
                  }}
                >
                  <h3 className="text-sm md:text-base font-semibold mb-3 text-foreground/90">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-full text-xs md:text-sm bg-secondary/60 text-secondary-foreground border border-border/60 hover:border-accent/50 hover:text-foreground transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8 mb-8 backdrop-blur-xl bg-card/40 border-border/30 shadow-2xl hover:shadow-accent/30 transition-all duration-500 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom duration-1000 delay-[480ms] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x" />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-lg transition-all duration-500" />
            <h2 className="text-2xl font-semibold mb-5 text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent relative z-10">
              Experience
            </h2>
            <div className="grid gap-4 relative z-10">
              {experiences.map((item, index) => (
                <div
                  key={item.role}
                  className="rounded-xl border border-border/40 bg-background/30 p-4 hover:border-primary/40 transition-colors"
                  style={{
                    animation: `slideInRight 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm md:text-base font-semibold text-foreground/90">{item.role}</h3>
                    <span className="text-xs md:text-sm px-2.5 py-1 rounded-full bg-secondary/70 border border-border/60 text-secondary-foreground">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-xs md:text-sm bg-secondary/60 text-secondary-foreground border border-border/60 hover:border-accent/50 hover:text-foreground transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Connect</h2>
            <div className="grid gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    style={{
                      animation: `slideInRight 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <Card
                      className={`p-5 md:p-6 transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl hover:shadow-accent/50 backdrop-blur-xl bg-card/40 border-border/30 relative overflow-hidden ${link.color} hover:-translate-y-2`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-lg bg-secondary/50 backdrop-blur-sm flex items-center justify-center group-hover:bg-transparent group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:translate-x-2 transition-transform duration-300">
                            {link.name}
                          </h3>
                          <p className="text-sm text-muted-foreground group-hover:text-current transition-colors">
                            @{link.url.split("/").filter(Boolean).pop()}
                          </p>
                        </div>
                        <svg
                          className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </Card>
                  </a>
                )
              })}
            </div>
          </div>

          <div className="mt-12 text-center animate-in fade-in duration-1000 delay-700">
            <p className="text-sm text-muted-foreground hover:text-foreground transition-colors">© 2025 riodl02</p>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes petalPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient-x 15s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}
