"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Box,
  Typography,
  Container,
  Paper,
  Breadcrumbs,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { BusinessCenter, NavigateNext, Home, ArrowBack } from "@mui/icons-material"

const TermsAndConditions = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [activeSection, setActiveSection] = useState("")

  // Sections for the terms and conditions
  const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "accounts", title: "User Accounts" },
    { id: "conduct", title: "User Conduct" },
    { id: "intellectual", title: "Intellectual Property" },
    { id: "privacy", title: "Privacy Policy" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "termination", title: "Termination" },
    { id: "governing", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Information" },
  ]

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBack />}
            component={Link}
            to="/"
            sx={{
              borderRadius: "50px",
              px: 2,
              py: 1,
              mr: 2,
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              background: "linear-gradient(135deg, #2681e4 0%, #5c9dc3 100%)",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                background: "linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)",
              },
            }}
          >
            Back to Home
          </Button>
        </Box>

        <Breadcrumbs separator={<NavigateNext fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Home sx={{ mr: 0.5 }} fontSize="small" />
            Home
          </Link>
          <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
            Terms and Conditions
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* Sidebar for navigation */}
          <Box
            component={Paper}
            sx={{
              width: { xs: "100%", md: 280 },
              p: 3,
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              height: "fit-content",
              position: { xs: "static", md: "sticky" },
              top: 100,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                display: "flex",
                alignItems: "center",
                color: "#1565c0",
              }}
            >
              <BusinessCenter sx={{ mr: 1 }} />
              Table of Contents
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List disablePadding>
              {sections.map((section) => (
                <ListItem
                  key={section.id}
                  button
                  onClick={() => scrollToSection(section.id)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    bgcolor: activeSection === section.id ? "rgba(25, 118, 210, 0.08)" : "transparent",
                    color: activeSection === section.id ? "#1976d2" : "inherit",
                    "&:hover": {
                      bgcolor: "rgba(25, 118, 210, 0.04)",
                    },
                  }}
                >
                  <ListItemText
                    primary={section.title}
                    primaryTypographyProps={{
                      fontWeight: activeSection === section.id ? 600 : 400,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Main content */}
          <Box
            component={Paper}
            sx={{
              flex: 1,
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                color: "#1565c0",
                textAlign: "center",
              }}
            >
              Terms and Conditions
            </Typography>

            <Typography variant="body1" paragraph sx={{ color: "text.secondary", mb: 4 }}>
              Last Updated: May 20, 2025
            </Typography>

            <Typography variant="body1" paragraph>
              Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the
              CareerConnect website and services operated by CareerConnect Inc.
            </Typography>

            <Typography variant="body1" paragraph>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these
              Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </Typography>

            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
              the terms, then you may not access the Service.
            </Typography>

            {/* Acceptance of Terms */}
            <Box id="acceptance" sx={{ scrollMarginTop: "100px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#1565c0",
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                1. Acceptance of Terms
              </Typography>
              <Typography variant="body1" paragraph>
                By creating an account on CareerConnect, you agree to be bound by these Terms of Service. If you do not
                agree to these Terms, you should not use our services. You must be at least 18 years old to use our
                services.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                CareerConnect provides a platform for job seekers to find employment opportunities and for employers to
                post job listings. These Terms govern your use of our website, mobile applications, and all related
                services (collectively, the "Services").
              </Typography>
            </Box>

            {/* User Accounts */}
            <Box id="accounts" sx={{ scrollMarginTop: "100px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#1565c0",
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                2. User Accounts
              </Typography>
              <Typography variant="body1" paragraph>
                When you create an account with us, you must provide accurate, complete, and up-to-date information. You
                are responsible for safeguarding the password that you use to access the Services and for any activities
                or actions under your password.
              </Typography>
              <Typography variant="body1" paragraph>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming
                aware of any breach of security or unauthorized use of your account.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                We reserve the right to terminate accounts, remove or edit content, or cancel orders at our sole
                discretion if we believe you have violated these Terms or if your conduct or content would tend to
                damage our reputation and goodwill.
              </Typography>
            </Box>

            {/* User Conduct */}
            <Box id="conduct" sx={{ scrollMarginTop: "100px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#1565c0",
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                3. User Conduct
              </Typography>
              <Typography variant="body1" paragraph>
                You agree to use our Services only for lawful purposes and in a way that does not infringe the rights
                of, restrict, or inhibit anyone else's use and enjoyment of the Services.
              </Typography>
              <Typography variant="body1" paragraph>
                Prohibited behavior includes but is not limited to:
              </Typography>
              <List sx={{ pl: 4, mb: 2 }}>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="Posting inaccurate, false, or misleading information" />
                </ListItem>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="Engaging in any unlawful or fraudulent activities" />
                </ListItem>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="Harassing, threatening, or intimidating other users" />
                </ListItem>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="Posting content that is defamatory, obscene, or offensive" />
                </ListItem>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="Attempting to gain unauthorized access to our systems or user accounts" />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                We reserve the right to remove any content that violates these Terms or that we find objectionable for
                any reason, without prior notice.
              </Typography>
            </Box>

            {/* Intellectual Property */}
            <Box id="intellectual" sx={{ scrollMarginTop: "100px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#1565c0",
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                4. Intellectual Property
              </Typography>
              <Typography variant="body1" paragraph>
                The Services and all content, features, and functionality (including but not limited to all information,
                software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof)
                are owned by CareerConnect, its licensors, or other providers and are protected by copyright, trademark,
                patent, trade secret, and other intellectual property or proprietary rights laws.
              </Typography>
              <Typography variant="body1" paragraph>
                You may not copy, modify, create derivative works of, publicly display, publicly perform, republish,
                download, store, or transmit any of the material on our Services, except as follows:
              </Typography>
              <List sx={{ pl: 4, mb: 2 }}>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="Your computer may temporarily store copies of such materials incidental to your accessing and viewing those materials." />
                </ListItem>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="You may store files that are automatically cached by your Web browser for display enhancement purposes." />
                </ListItem>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="You may print or download one copy of a reasonable number of pages of the Services for your own personal, non-commercial use and not for further reproduction, publication, or distribution." />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                If you print, copy, modify, download, or otherwise use or provide any other person with access to any
                part of the Services in breach of the Terms, your right to use the Services will cease immediately and
                you must, at our option, return or destroy any copies of the materials you have made.
              </Typography>
            </Box>

            {/* Privacy Policy */}
            <Box id="privacy" sx={{ scrollMarginTop: "100px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#1565c0",
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                5. Privacy Policy
              </Typography>
              <Typography variant="body1" paragraph>
                Your use of our Services is also governed by our Privacy Policy, which is incorporated into these Terms
                by reference. Our Privacy Policy outlines how we collect, use, and protect your personal information.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                By using our Services, you consent to the collection and use of your information as described in our
                Privacy Policy. If you do not agree with our Privacy Policy, please do not use our Services.
              </Typography>
            </Box>

            {/* Limitation of Liability */}
            <Box id="liability" sx={{ scrollMarginTop: "100px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#1565c0",
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                6. Limitation of Liability
              </Typography>
              <Typography variant="body1" paragraph>
                In no event shall CareerConnect, its directors, employees, partners, agents, suppliers, or affiliates be
                liable for any indirect, incidental, special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </Typography>
              <List sx={{ pl: 4, mb: 2 }}>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="Your access to or use of or inability to access or use the Services" />
                </ListItem>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="Any conduct or content of any third party on the Services" />
                </ListItem>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="Any content obtained from the Services" />
                </ListItem>
                <ListItem sx={{ display: "list-item", listStyleType: "disc", pl: 0 }}>
                  <ListItemText primary="Unauthorized access, use, or alteration of your transmissions or content" />
                </ListItem>
              </List>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                The foregoing limitation of liability shall apply to the fullest extent permitted by law in the
                applicable jurisdiction. You specifically acknowledge that CareerConnect shall not be liable for user
                submissions or the defamatory, offensive, or illegal conduct of any third party and that the risk of
                harm or damage from the foregoing rests entirely with you.
              </Typography>
            </Box>

            {/* Termination */}
            <Box id="termination" sx={{ scrollMarginTop: "100px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#1565c0",
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                7. Termination
              </Typography>
              <Typography variant="body1" paragraph>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the Terms.
              </Typography>
              <Typography variant="body1" paragraph>
                Upon termination, your right to use the Services will immediately cease. If you wish to terminate your
                account, you may simply discontinue using the Services or contact us to request account deletion.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                All provisions of the Terms which by their nature should survive termination shall survive termination,
                including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of
                liability.
              </Typography>
            </Box>

            {/* Governing Law */}
            <Box id="governing" sx={{ scrollMarginTop: "100px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#1565c0",
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                8. Governing Law
              </Typography>
              <Typography variant="body1" paragraph>
                These Terms shall be governed and construed in accordance with the laws of the United States, without
                regard to its conflict of law provisions.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
                provisions of these Terms will remain in effect.
              </Typography>
            </Box>

            {/* Changes to Terms */}
            <Box id="changes" sx={{ scrollMarginTop: "100px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#1565c0",
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                9. Changes to Terms
              </Typography>
              <Typography variant="body1" paragraph>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will try to provide at least 30 days' notice prior to any new terms taking
                effect.
              </Typography>
              <Typography variant="body1" paragraph>
                What constitutes a material change will be determined at our sole discretion. By continuing to access or
                use our Services after those revisions become effective, you agree to be bound by the revised terms.
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                It is your responsibility to review these Terms periodically for changes. If you do not agree to the
                revised terms, please stop using our Services.
              </Typography>
            </Box>

            {/* Contact Information */}
            <Box id="contact" sx={{ scrollMarginTop: "100px" }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#1565c0",
                  pb: 1,
                  borderBottom: "2px solid",
                  borderColor: "primary.light",
                }}
              >
                10. Contact Information
              </Typography>
              <Typography variant="body1" paragraph>
                If you have any questions about these Terms, please contact us at:
              </Typography>
              <Box sx={{ mb: 2, pl: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  CareerConnect Inc.
                </Typography>
                <Typography variant="body1"> Business Avenue</Typography>
                <Typography variant="body1">kathmandu</Typography>
                <Typography variant="body1">Nepal</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Email: careerconnect1@gmail.com
                </Typography>
                <Typography variant="body1">Phone: +977 9741720726</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                By using CareerConnect's services, you acknowledge that you have read, understood, and agree to be bound
                by these Terms and Conditions.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default TermsAndConditions
