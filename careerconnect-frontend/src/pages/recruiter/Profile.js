"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Chip,
  Container,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Fade,
} from "@mui/material"
import { Edit, Phone, Email, School, LocationOn, Person, ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const RecruiterProfile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/login")
          return
        }

        const response = await axios.get('http://localhost:5000/api/recruiter/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log('Raw profile API response:', response.data)
        const validatedProfile = { ...response.data }
        if (validatedProfile.profile_photo) {
          const isValidPath = validatedProfile.profile_photo.startsWith('/uploads') && !validatedProfile.profile_photo.includes('/static/media')
          if (!isValidPath) {
            console.warn('Invalid profile_photo detected, setting to null:', validatedProfile.profile_photo)
            validatedProfile.profile_photo = null
          } else {
            console.log('Validated profile_photo:', validatedProfile.profile_photo)
          }
        }
        setProfile(validatedProfile)
      } catch (err) {
        console.error("Error fetching profile:", err)
        setSnackbar({
          open: true,
          message: err.response?.data?.message || "Failed to fetch profile",
          severity: "error",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
          Loading your profile...
        </Typography>
      </Box>
    )
  }

  if (!profile) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No profile data found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/recruiter/profile-edit")}
          startIcon={<Edit />}
        >
          Create Profile
        </Button>
      </Box>
    )
  }

  const getInitials = (name) => {
    if (!name) return "C"
    return name
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join("")
      .slice(0, 2)
  }

  const avatarSrc = profile.profile_photo ? `http://localhost:5000${profile.profile_photo}` : undefined
  console.log('Final Avatar src before rendering:', avatarSrc)

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={() => window.history.back()}
            sx={{
              borderRadius: "50px",
              px: 2,
              py: 1,
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              background: "linear-gradient(135deg, #2681e4 0%, #5c9dc3 100%)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                background: "linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)",
              },
            }}
          >
            Back
          </Button>
        </Box>
        <Fade in={true} timeout={800}>
          <Box>
            {/* Header Card with Avatar */}
            <Paper
              elevation={3}
              sx={{
                p: 0,
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                mb: 3,
                position: "relative",
              }}
            >
              {/* Banner Background */}
              <Box
                sx={{
                  height: { xs: 120, sm: 150, md: 180 },
                  bgcolor: "primary.main",
                  background: "linear-gradient(135deg, #2681e4 0%, #5c9dc3 100%)",
                  position: "relative",
                }}
              />

              <Box
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  pt: { xs: 0, sm: 0, md: 0 },
                  mt: { xs: -8, sm: -9, md: -10 },
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "center" : "flex-end",
                    mb: 3,
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 120, sm: 140, md: 160 },
                      height: { xs: 120, sm: 140, md: 160 },
                      border: "5px solid white",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                      fontWeight: "bold",
                      bgcolor: "primary.dark",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                    src={avatarSrc}
                    onError={(e) => {
                      e.target.src = undefined
                      console.log('Avatar image load failed, falling back to initials')
                    }}
                  >
                    {getInitials(profile.name)}
                  </Avatar>

                  <Box
                    sx={{
                      ml: isMobile ? 0 : 3,
                      mt: isMobile ? 2 : 0,
                      textAlign: isMobile ? "center" : "left",
                      flex: 1,
                    }}
                  >
                    <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold" sx={{ mb: 0.5, color: "#FFFFFF" }}>
                      {profile.name || "N/A"}
                    </Typography>
                    <Box sx={{ mt: 8 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: isMobile ? "center" : "flex-start",
                          mb: 1,
                        }}
                      >
                        <Email fontSize="small" color="action" sx={{ mr: 1 }} />
                        <Typography variant="body1" color="text.secondary">
                          {profile.email || "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                    {profile.degree && (
                      <Chip
                        icon={<School />}
                        label={profile.degree}
                        color="primary"
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        sx={{ mr: 1, mb: 1 }}
                      />
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                    onClick={() => navigate("/recruiter/profile-edit")}
                    sx={{
                      alignSelf: isMobile ? "center" : "flex-start",
                      mt: isMobile ? 2 : 0,
                      boxShadow: "0 4px 12px rgba(63, 81, 181, 0.2)",
                      "&:hover": {
                        boxShadow: "0 6px 16px rgba(63, 81, 181, 0.3)",
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Box>
            </Paper>

            {/* Personal Information */}
            <Grid container spacing={3}>
              {/* Contact Information */}
              <Grid item xs={12} md={6}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pb: 1,
                        borderBottom: "2px solid",
                        borderColor: "primary.light",
                      }}
                    >
                      <Person sx={{ mr: 1 }} /> Personal Information
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                      <Grid container spacing={3}>
                        {/* Phone Info - Card Style */}
                        <Grid item xs={12} sm={6}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                              boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                              transition: "transform 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.03)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "linear-gradient(135deg, #2681e4 0%, #5c9dc3 100%)",
                                  boxShadow: "0 4px 8px rgba(38, 129, 228, 0.2)",
                                  mr: 2,
                                }}
                              >
                                <Phone sx={{ color: "white" }} />
                              </Box>
                              <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                Phone
                              </Typography>
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                pl: 7,
                                fontWeight: "500",
                                color: profile.phone ? "text.primary" : "text.secondary",
                                fontSize: "1.05rem",
                              }}
                            >
                              {profile.phone || "Not provided"}
                            </Typography>
                          </Paper>
                        </Grid>

                        {/* Gender Info - Card Style */}
                        <Grid item xs={12} sm={6}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                              boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                              transition: "transform 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.03)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "linear-gradient(135deg, #2681e4 0%, #5c9dc3 100%)",
                                  boxShadow: "0 4px 8px rgba(38, 129, 228, 0.2)",
                                  mr: 2,
                                }}
                              >
                                <Person sx={{ color: "white" }} />
                              </Box>
                              <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                Gender
                              </Typography>
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                pl: 7,
                                fontWeight: "500",
                                color: profile.gender ? "text.primary" : "text.secondary",
                                fontSize: "1.05rem",
                                textTransform: "capitalize",
                              }}
                            >
                              {profile.gender || "Not provided"}
                            </Typography>
                          </Paper>
                        </Grid>

                        {/* Degree Info - Card Style */}
                        <Grid item xs={12} sm={6}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                              boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                              transition: "transform 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.03)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "linear-gradient(135deg, #2681e4 0%, #5c9dc3 100%)",
                                  boxShadow: "0 4px 8px rgba(38, 129, 228, 0.2)",
                                  mr: 2,
                                }}
                              >
                                <School sx={{ color: "white" }} />
                              </Box>
                              <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                Degree
                              </Typography>
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                pl: 7,
                                fontWeight: "500",
                                color: profile.degree ? "text.primary" : "text.secondary",
                                fontSize: "1.05rem",
                              }}
                            >
                              {profile.degree || "Not provided"}
                            </Typography>
                          </Paper>
                        </Grid>

                        {/* Institute Info - Card Style */}
                        <Grid item xs={12} sm={6}>
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              background: "linear-gradient(145deg, #f0f0f0, #ffffff)",
                              boxShadow: "5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                              transition: "transform 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.03)",
                              },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  background: "linear-gradient(135deg, #2681e4 0%, #5c9dc3 100%)",
                                  boxShadow: "0 4px 8px rgba(38, 129, 228, 0.2)",
                                  mr: 2,
                                }}
                              >
                                <School sx={{ color: "white" }} />
                              </Box>
                              <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                Institute
                              </Typography>
                            </Box>
                            <Typography
                              variant="body1"
                              sx={{
                                pl: 7,
                                fontWeight: "500",
                                color: profile.institute ? "text.primary" : "text.secondary",
                                fontSize: "1.05rem",
                              }}
                            >
                              {profile.institute || "Not provided"}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Address Information */}
              <Grid item xs={12} md={6}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pb: 1,
                        borderBottom: "2px solid",
                        borderColor: "primary.light",
                      }}
                    >
                      <LocationOn sx={{ mr: 1 }} /> Address Information
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Permanent Address
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          mb: 2,
                          borderRadius: 2,
                          borderColor: "divider",
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <LocationOn color="primary" sx={{ mr: 1, mt: 0.3 }} />
                        <Typography variant="body2">
                          {profile.permanent_address
                            ? `${profile.permanent_address.province || "N/A"}, ${profile.permanent_address.district || "N/A"}, ${profile.permanent_address.municipality || "N/A"}, ${profile.permanent_address.city || "N/A"}`
                            : "Not provided"}
                        </Typography>
                      </Paper>

                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Current Address
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          borderColor: "divider",
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <LocationOn color="primary" sx={{ mr: 1, mt: 0.3 }} />
                        <Typography variant="body2">
                          {profile.current_address
                            ? `${profile.current_address.province || "N/A"}, ${profile.current_address.district || "N/A"}, ${profile.current_address.municipality || "N/A"}, ${profile.current_address.city || "N/A"}`
                            : "Not provided"}
                        </Typography>
                      </Paper>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Additional Information Card - Can be expanded with more profile data */}
              <Grid item xs={12}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="primary"
                      gutterBottom
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pb: 1,
                        borderBottom: "2px solid",
                        borderColor: "primary.light",
                      }}
                    >
                      <School sx={{ mr: 1 }} /> Complete Your Profile
                    </Typography>

                    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography variant="body1" color="text.secondary" align="center">
                        Complete remaining information to enhance your profile visibility.
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<Edit />}
                        onClick={() => navigate("/recruiter/profile-edit")}
                        sx={{ mt: 2 }}
                      >
                        Add your information
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          variant="filled"
          elevation={6}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default RecruiterProfile