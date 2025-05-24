// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, TextField, Box, Typography } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// const OCRUpload = () => {
//   const [file, setFile] = useState(null);
//   const [result, setResult] = useState('');
//   const [error, setError] = useState('');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };
// const handleUpload = async () => {
//   if (!file) {
//     setError('Please select a file');
//     return;
//   }

//   const formData = new FormData();
//   formData.append('document', file);

//   try {
//     const response = await axios.post('http://localhost:5000/api/ocr', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     setResult(response.data.text);
//     setError('');
//   } catch (err) {
//     console.error('Axios Error:', err);
//     if (err.code === 'ECONNREFUSED') {
//       setError('Cannot connect to the server. Ensure the backend is running on port 5000.');
//     } else if (err.response?.status === 500) {
//       setError('Server error: ' + (err.response.data.error || 'Internal Server Error'));
//     } else {
//       setError('Failed to process document: ' + (err.response?.data?.error || err.message));
//     }
//     setResult('');
//   }
// };
//   return (
//     <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
//       <Typography variant="h6" gutterBottom>
//         Upload Document for OCR
//       </Typography>
//       <TextField
//         type="file"
//         onChange={handleFileChange}
//         inputProps={{ accept: '.jpg,.jpeg,.png,.pdf' }} // Accept common document formats
//         fullWidth
//         sx={{ mb: 3 }}
//       />
//       <Button
//         variant="contained"
//         startIcon={<CloudUploadIcon />}
//         onClick={handleUpload}
//         disabled={!file}
//         sx={{ mb: 3 }}
//       >
//         Upload and Extract Text
//       </Button>
//       {error && <Typography color="error">{error}</Typography>}
//       {result && (
//         <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
//           <Typography>Extracted Text:</Typography>
//           <Typography>{result}</Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default OCRUpload;

"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  IconButton,
  Alert,
  CircularProgress,
  Chip,
  useTheme,
  useMediaQuery,
  Container,
  Grid,
  Divider,
} from "@mui/material"
import {
  CloudUpload as CloudUploadIcon,
  ArrowBack as ArrowBackIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material"

const OCRUpload = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
    setError("")
    setResult("")

    if (selectedFile) {
      // Create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFilePreview({
            type: "image",
            url: e.target.result,
            name: selectedFile.name,
            size: selectedFile.size,
          })
        }
        reader.readAsDataURL(selectedFile)
      } else if (selectedFile.type === "application/pdf") {
        setFilePreview({
          type: "pdf",
          name: selectedFile.name,
          size: selectedFile.size,
        })
      }
    } else {
      setFilePreview(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file")
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append("document", file)

    try {
      const response = await axios.post("http://localhost:5000/api/ocr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setResult(response.data.text)
      setError("")
    } catch (err) {
      console.error("Axios Error:", err)
      if (err.code === "ECONNREFUSED") {
        setError("Cannot connect to the server. Ensure the backend is running on port 5000.")
      } else if (err.response?.status === 500) {
        setError("Server error: " + (err.response.data.error || "Internal Server Error"))
      } else {
        setError("Failed to process document: " + (err.response?.data?.error || err.message))
      }
      setResult("")
    } finally {
      setLoading(false)
    }
  }

  const handleClearFile = () => {
    setFile(null)
    setFilePreview(null)
    setResult("")
    setError("")
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleBack = () => {
    navigate(-1) // Go back to previous page
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fa",
        backgroundImage: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        py: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {/* Header with Back Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: { xs: 2, sm: 3, md: 4 },
            gap: 2,
          }}
        >
          <IconButton
            onClick={handleBack}
            sx={{
              bgcolor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              "&:hover": {
                bgcolor: "#f5f5f5",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant={isSmall ? "h5" : "h4"}
            sx={{
              fontWeight: 700,
              color: "#1565c0",
              textShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            Document OCR Scanner
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Upload Section */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 3,
                bgcolor: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.05)",
                height: "fit-content",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <DescriptionIcon sx={{ color: "#1976d2", mr: 1, fontSize: "1.5rem" }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#1565c0" }}>
                  Upload Document
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                Upload an image (JPG, PNG) or PDF document to extract text using OCR technology. Maximum file size:
                10MB.
              </Typography>

              {/* File Input */}
              <TextField
                type="file"
                onChange={handleFileChange}
                inputProps={{
                  accept: ".jpg,.jpeg,.png,.pdf",
                  style: { padding: "12px" },
                }}
                fullWidth
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#90caf9",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />

              {/* File Preview */}
              {filePreview && (
                <Card
                  sx={{
                    mb: 3,
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    overflow: "hidden",
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        {filePreview.type === "image" ? (
                          <ImageIcon sx={{ color: "#4caf50" }} />
                        ) : (
                          <PdfIcon sx={{ color: "#f44336" }} />
                        )}
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {filePreview.name}
                        </Typography>
                      </Box>
                      <IconButton size="small" onClick={handleClearFile} sx={{ color: "#666" }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <Chip
                        label={filePreview.type.toUpperCase()}
                        size="small"
                        color={filePreview.type === "image" ? "success" : "error"}
                        sx={{ fontSize: "0.75rem" }}
                      />
                      <Chip
                        label={formatFileSize(filePreview.size)}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    </Box>

                    {/* Image Preview */}
                    {filePreview.type === "image" && (
                      <Box
                        sx={{
                          width: "100%",
                          maxHeight: 200,
                          overflow: "hidden",
                          borderRadius: 1,
                          bgcolor: "#f5f5f5",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={filePreview.url || "/placeholder.svg"}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "200px",
                            objectFit: "contain",
                            borderRadius: "4px",
                          }}
                        />
                      </Box>
                    )}

                    {/* PDF Indicator */}
                    {filePreview.type === "pdf" && (
                      <Box
                        sx={{
                          p: 3,
                          textAlign: "center",
                          bgcolor: "#fafafa",
                          borderRadius: 1,
                          border: "2px dashed #e0e0e0",
                        }}
                      >
                        <PdfIcon sx={{ fontSize: 48, color: "#f44336", mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          PDF Document Ready for Processing
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  alignItems: "stretch",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                  onClick={handleUpload}
                  disabled={!file || loading}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                      transform: "translateY(-1px)",
                    },
                    "&:disabled": {
                      bgcolor: "#e0e0e0",
                      color: "#9e9e9e",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {loading ? "Processing..." : "Extract Text"}
                </Button>

                {file && (
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleClearFile}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      borderColor: "#90caf9",
                      color: "#1976d2",
                      "&:hover": {
                        borderColor: "#1976d2",
                        bgcolor: "rgba(25, 118, 210, 0.04)",
                      },
                    }}
                  >
                    Clear
                  </Button>
                )}
              </Box>

              {/* Error Display */}
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 3,
                    borderRadius: 2,
                    "& .MuiAlert-message": {
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  {error}
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 3,
                bgcolor: "white",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.05)",
                minHeight: { lg: "500px" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <DescriptionIcon sx={{ color: "#4caf50", mr: 1, fontSize: "1.5rem" }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: "#2e7d32" }}>
                  Extracted Text
                </Typography>
              </Box>

              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 6,
                    textAlign: "center",
                  }}
                >
                  <CircularProgress size={48} sx={{ mb: 2, color: "#1976d2" }} />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Processing Document...
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Please wait while we extract text from your document
                  </Typography>
                </Box>
              )}

              {!loading && !result && !error && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 6,
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  <DescriptionIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
                  <Typography variant="h6" sx={{ mb: 1, opacity: 0.7 }}>
                    No Text Extracted Yet
                  </Typography>
                  <Typography variant="body2">
                    Upload a document and click "Extract Text" to see results here
                  </Typography>
                </Box>
              )}

              {result && !loading && (
                <>
                  <Alert
                    severity="success"
                    sx={{
                      mb: 3,
                      borderRadius: 2,
                      "& .MuiAlert-message": {
                        fontSize: "0.9rem",
                      },
                    }}
                  >
                    Text extraction completed successfully!
                  </Alert>

                  <Divider sx={{ mb: 3 }} />

                  <Box
                    sx={{
                      p: 3,
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                      bgcolor: "#fafafa",
                      maxHeight: "400px",
                      overflow: "auto",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        bgcolor: "#f1f1f1",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        bgcolor: "#c1c1c1",
                        borderRadius: "4px",
                        "&:hover": {
                          bgcolor: "#a8a8a8",
                        },
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        fontFamily: "monospace",
                        fontSize: "0.9rem",
                      }}
                    >
                      {result}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigator.clipboard.writeText(result)}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Copy Text
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        const blob = new Blob([result], { type: "text/plain" })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement("a")
                        a.href = url
                        a.download = "extracted-text.txt"
                        a.click()
                        URL.revokeObjectURL(url)
                      }}
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Download
                    </Button>
                  </Box>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Instructions */}
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            bgcolor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#1565c0" }}>
            How to Use OCR Scanner
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "#e3f2fd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                    1
                  </Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Select File
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose an image or PDF document
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "#e8f5e9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                    2
                  </Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Preview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Review your uploaded file
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "#fff3e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#ff9800", fontWeight: "bold" }}>
                    3
                  </Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Extract
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to process and extract text
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    bgcolor: "#f3e5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#9c27b0", fontWeight: "bold" }}>
                    4
                  </Typography>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Use Text
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Copy or download extracted text
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}

export default OCRUpload
