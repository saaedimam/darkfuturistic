import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { ParticleBackground } from "../ParticleBackground"
import { MapPin, Mail, Phone, Calendar, Award, Target } from "lucide-react"

export function ProfilePage() {
  const skills = [
    { name: "Python", level: 95, color: "#4CAF50" },
    { name: "Supabase", level: 92, color: "#66BB6A" },
    { name: "FastAPI", level: 90, color: "#4CAF50" },
    { name: "Next.js", level: 88, color: "#66BB6A" },
    { name: "Docker", level: 85, color: "#4CAF50" },
    { name: "Flutter", level: 82, color: "#66BB6A" },
    { name: "AWS", level: 88, color: "#4CAF50" },
    { name: "Textile IoT (RFID)", level: 90, color: "#66BB6A" },
    { name: "UX Strategy", level: 85, color: "#4CAF50" },
  ]

  const achievements = [
    { title: "Co-Founder & Platform Architect", company: "StitchOS", year: "2024" },
    { title: "Lead – Web & Software Development", company: "Kattali Textile Ltd.", year: "2023" },
    { title: "Digital Transformation Leader", company: "KTLBD - 850+ employees", year: "2023" },
    { title: "RFID & IoT Systems Expert", company: "Textile Industry", year: "2022" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative pt-20">
      <ParticleBackground particleCount={40} connectionDistance={100} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <Card className="lg:col-span-1 bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src="/profile.png"
                  alt="Saaed Imam - StitchOS Co-Founder"
                  className="w-full h-full rounded-full object-cover border-4 border-[#00BFA6]/30"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#00BFA6] to-[#FF7F3F] rounded-full flex items-center justify-center">
                  <Award size={16} className="text-white" />
                </div>
              </div>

              <h2 className="text-2xl text-white mb-2 font-outfit">Saaed Imam</h2>
              <p className="text-[#4CAF50] mb-4 font-inter">Co-Founder & Platform Architect</p>

              <div className="space-y-3 text-slate-300">
                <div className="flex items-center gap-3 font-inter">
                  <MapPin size={16} className="text-[#FF7F3F]" />
                  <span>Chittagong, Bangladesh</span>
                </div>
                <div className="flex items-center gap-3 font-inter">
                  <Mail size={16} className="text-[#FF7F3F]" />
                  <span>sayedimam.fahim@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 font-inter">
                  <Phone size={16} className="text-[#FF7F3F]" />
                  <span>+8801729809879</span>
                </div>
                <div className="flex items-center gap-3 font-inter">
                  <Calendar size={16} className="text-[#FF7F3F]" />
                  <span>StitchOS Co-Founder</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl text-[#4CAF50] font-outfit">850+</div>
                    <div className="text-sm text-slate-400 font-inter">Employees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-[#66BB6A] font-outfit">100%</div>
                    <div className="text-sm text-slate-400 font-inter">Digital</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl text-[#4CAF50] font-outfit">B2B</div>
                    <div className="text-sm text-slate-400 font-inter">Export</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Skills and Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills Section */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="text-[#00BFA6]" size={24} />
                <h3 className="text-xl text-white font-outfit">Technical Skills</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 font-inter">{skill.name}</span>
                      <span className="text-slate-400 font-inter">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skill.color}40, ${skill.color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements Section */}
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="text-[#FF7F3F]" size={24} />
                <h3 className="text-xl text-white font-outfit">Achievements & Experience</h3>
              </div>

              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-[#00BFA6]/30 transition-all duration-300"
                  >
                    <div>
                      <h4 className="text-white font-inter">{achievement.title}</h4>
                      <p className="text-slate-400 font-inter">{achievement.company}</p>
                    </div>
                    <Badge variant="outline" className="border-[#FF7F3F]/30 text-[#FF7F3F]">
                      {achievement.year}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
