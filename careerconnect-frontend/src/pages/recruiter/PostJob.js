// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   TextField,
// //   Button,
// //   Select,
// //   MenuItem,
// //   FormControl,
// //   InputLabel,
// //   Alert,
// //   Snackbar,
// //   CircularProgress,
// //   Paper,
// //   Typography,
// //   Container,
// //   Box,
// //   Grid,
// //   Divider,
// //   Chip,
// //   IconButton,
// //   Tooltip,
// //   Card,
// //   CardContent,
// //   FormHelperText,
// //   InputAdornment,
// //   useTheme,
// //   useMediaQuery,
// //   Stepper,
// //   Step,
// //   StepLabel
// // } from '@mui/material';
// // import {
// //   Work,
// //   Business,
// //   LocationOn,
// //   AttachMoney,
// //   Description,
// //   Code,
// //   Info,
// //   ArrowBack,
// //   ArrowForward,
// //   Check,
// //   HelpOutline,
// //   AccessTime
// // } from '@mui/icons-material';
// // import "../../styles/PostJob.css";

// // const PostJob = ({ onSuccess }) => {
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     company: '',
// //     location: '',
// //     description: '',
// //     salary: '',
// //     jobType: 'full-time',
// //     skills: ''
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
// //   const [activeStep, setActiveStep] = useState(0);
// //   const [skillsArray, setSkillsArray] = useState([]);
// //   const [currentSkill, setCurrentSkill] = useState('');
  
// //   const navigate = useNavigate();
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

// //   const jobTypes = [
// //     { value: 'full-time', label: 'Full-time', icon: <AccessTime fontSize="small" /> },
// //     { value: 'part-time', label: 'Part-time', icon: <AccessTime fontSize="small" /> },
// //     { value: 'contract', label: 'Contract', icon: <AccessTime fontSize="small" /> },
// //     { value: 'internship', label: 'Internship', icon: <AccessTime fontSize="small" /> },
// //     { value: 'remote', label: 'Remote', icon: <LocationOn fontSize="small" /> }
// //   ];

// //   const steps = [
// //     'Basic Information',
// //     'Job Details',
// //     'Review & Post'
// //   ];

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({
// //       ...formData,
// //       [name]: value
// //     });
// //     // Clear error when user types
// //     if (errors[name]) {
// //       setErrors({ ...errors, [name]: '' });
// //     }
// //   };

// //   const handleSkillInputChange = (e) => {
// //     setCurrentSkill(e.target.value);
// //   };

// //   const handleSkillInputKeyDown = (e) => {
// //     if (e.key === 'Enter' && currentSkill.trim()) {
// //       e.preventDefault();
// //       addSkill();
// //     }
// //   };

// //   const addSkill = () => {
// //     if (currentSkill.trim() && !skillsArray.includes(currentSkill.trim())) {
// //       const newSkills = [...skillsArray, currentSkill.trim()];
// //       setSkillsArray(newSkills);
// //       setFormData({
// //         ...formData,
// //         skills: newSkills.join(',')
// //       });
// //       setCurrentSkill('');
// //     }
// //   };

// //   const removeSkill = (skillToRemove) => {
// //     const newSkills = skillsArray.filter(skill => skill !== skillToRemove);
// //     setSkillsArray(newSkills);
// //     setFormData({
// //       ...formData,
// //       skills: newSkills.join(',')
// //     });
// //   };

// //   const validateStep = (step) => {
// //     const newErrors = {};
    
// //     if (step === 0) {
// //       if (!formData.title.trim()) newErrors.title = 'Job title is required';
// //       if (!formData.company.trim()) newErrors.company = 'Company name is required';
// //       if (!formData.location.trim()) newErrors.location = 'Location is required';
// //     } else if (step === 1) {
// //       if (!formData.description.trim()) newErrors.description = 'Description is required';
// //       if (formData.description.length < 50) newErrors.description = 'Description should be at least 50 characters';
// //       if (formData.salary && !/^\d+(\.\d{1,2})?$/.test(formData.salary)) {
// //         newErrors.salary = 'Enter valid salary (numbers only)';
// //       }
// //     }
    
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleNext = () => {
// //     if (validateStep(activeStep)) {
// //       setActiveStep((prevStep) => prevStep + 1);
// //     }
// //   };

// //   const handleBack = () => {
// //     setActiveStep((prevStep) => prevStep - 1);
// //   };

// //   const validate = () => {
// //     const newErrors = {};
// //     if (!formData.title.trim()) newErrors.title = 'Job title is required';
// //     if (!formData.company.trim()) newErrors.company = 'Company name is required';
// //     if (!formData.location.trim()) newErrors.location = 'Location is required';
// //     if (!formData.description.trim()) newErrors.description = 'Description is required';
// //     if (formData.description.length < 50) newErrors.description = 'Description should be at least 50 characters';
// //     if (formData.salary && !/^\d+(\.\d{1,2})?$/.test(formData.salary)) {
// //       newErrors.salary = 'Enter valid salary (numbers only)';
// //     }
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     if (e) e.preventDefault();
// //     if (!validate()) return;

// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await axios.post('http://localhost:5000/api/jobs', 
// //         {
// //           ...formData,
// //           posted_by: localStorage.getItem('userId') // Add recruiter ID
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       setAlert({
// //         open: true,
// //         message: 'Job posted successfully!',
// //         severity: 'success'
// //       });
      
// //       // Reset form after successful submission
// //       setFormData({
// //         title: '',
// //         company: '',
// //         location: '',
// //         description: '',
// //         salary: '',
// //         jobType: 'full-time',
// //         skills: ''
// //       });
// //       setSkillsArray([]);
// //       setActiveStep(0);

// //       // Call onSuccess if provided (for modal usage)
// //       if (onSuccess) {
// //         onSuccess();
// //       } else {
// //         // Redirect after delay
// //         setTimeout(() => navigate('/recruiter-dashboard'), 1500);
// //       }

// //     } catch (error) {
// //       let message = 'Failed to post job';
// //       if (error.response) {
// //         if (error.response.status === 401) {
// //           message = 'Please login to post jobs';
// //         } else if (error.response.data?.message) {
// //           message = error.response.data.message;
// //         }
// //       }
// //       setAlert({
// //         open: true,
// //         message,
// //         severity: 'error'
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCloseAlert = () => {
// //     setAlert({ ...alert, open: false });
// //   };

// //   const getStepContent = (step) => {
// //     switch (step) {
// //       case 0:
// //         return (
// //           <Box>
// //             <Typography variant="h6" color="primary" gutterBottom>
// //               Basic Job Information
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary" paragraph>
// //               Start by providing the essential details about the position.
// //             </Typography>
            
// //             <Grid container spacing={3}>
// //               <Grid item xs={12}>
// //                 <TextField
// //                   fullWidth
// //                   label="Job Title"
// //                   name="title"
// //                   value={formData.title}
// //                   onChange={handleChange}
// //                   error={!!errors.title}
// //                   helperText={errors.title}
// //                   required
// //                   variant="outlined"
// //                   InputProps={{
// //                     startAdornment: (
// //                       <InputAdornment position="start">
// //                         <Work color="action" />
// //                       </InputAdornment>
// //                     ),
// //                     sx: { borderRadius: 1.5 }
// //                   }}
// //                   placeholder="e.g. Senior Software Engineer"
// //                 />
// //               </Grid>
              
// //               <Grid item xs={12} md={6}>
// //                 <TextField
// //                   fullWidth
// //                   label="Company Name"
// //                   name="company"
// //                   value={formData.company}
// //                   onChange={handleChange}
// //                   error={!!errors.company}
// //                   helperText={errors.company}
// //                   required
// //                   variant="outlined"
// //                   InputProps={{
// //                     startAdornment: (
// //                       <InputAdornment position="start">
// //                         <Business color="action" />
// //                       </InputAdornment>
// //                     ),
// //                     sx: { borderRadius: 1.5 }
// //                   }}
// //                   placeholder="e.g. Tech Innovations Inc."
// //                 />
// //               </Grid>
              
// //               <Grid item xs={12} md={6}>
// //                 <TextField
// //                   fullWidth
// //                   label="Location"
// //                   name="location"
// //                   value={formData.location}
// //                   onChange={handleChange}
// //                   error={!!errors.location}
// //                   helperText={errors.location}
// //                   required
// //                   variant="outlined"
// //                   InputProps={{
// //                     startAdornment: (
// //                       <InputAdornment position="start">
// //                         <LocationOn color="action" />
// //                       </InputAdornment>
// //                     ),
// //                     sx: { borderRadius: 1.5 }
// //                   }}
// //                   placeholder="e.g. New York, NY or Remote"
// //                 />
// //               </Grid>
              
// //               <Grid item xs={12}>
// //                 <FormControl fullWidth variant="outlined" error={!!errors.jobType}>
// //                   <InputLabel>Job Type</InputLabel>
// //                   <Select
// //                     name="jobType"
// //                     value={formData.jobType}
// //                     onChange={handleChange}
// //                     label="Job Type"
// //                     sx={{ borderRadius: 1.5 }}
// //                   >
// //                     {jobTypes.map(type => (
// //                       <MenuItem key={type.value} value={type.value}>
// //                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                           {type.icon}
// //                           <Box sx={{ ml: 1 }}>{type.label}</Box>
// //                         </Box>
// //                       </MenuItem>
// //                     ))}
// //                   </Select>
// //                   {errors.jobType && <FormHelperText>{errors.jobType}</FormHelperText>}
// //                 </FormControl>
// //               </Grid>
// //             </Grid>
// //           </Box>
// //         );
      
// //       case 1:
// //         return (
// //           <Box>
// //             <Typography variant="h6" color="primary" gutterBottom>
// //               Detailed Job Information
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary" paragraph>
// //               Provide more details to attract the right candidates.
// //             </Typography>
            
// //             <Grid container spacing={3}>
// //               <Grid item xs={12}>
// //                 <TextField
// //                   fullWidth
// //                   label="Salary (optional)"
// //                   name="salary"
// //                   value={formData.salary}
// //                   onChange={handleChange}
// //                   error={!!errors.salary}
// //                   helperText={errors.salary}
// //                   variant="outlined"
// //                   InputProps={{
// //                     startAdornment: (
// //                       <InputAdornment position="start">
// //                         <AttachMoney color="action" />
// //                       </InputAdornment>
// //                     ),
// //                     sx: { borderRadius: 1.5 }
// //                   }}
// //                   placeholder="e.g. 50000 or 25.50/hour"
// //                 />
// //               </Grid>
              
// //               <Grid item xs={12}>
// //                 <Box sx={{ mb: 1 }}>
// //                   <Typography variant="subtitle2" gutterBottom>
// //                     Required Skills
// //                   </Typography>
// //                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                     <TextField
// //                       fullWidth
// //                       value={currentSkill}
// //                       onChange={handleSkillInputChange}
// //                       onKeyDown={handleSkillInputKeyDown}
// //                       placeholder="Type a skill and press Enter"
// //                       variant="outlined"
// //                       InputProps={{
// //                         startAdornment: (
// //                           <InputAdornment position="start">
// //                             <Code color="action" />
// //                           </InputAdornment>
// //                         ),
// //                         sx: { borderRadius: 1.5 }
// //                       }}
// //                     />
// //                     <Button 
// //                       onClick={addSkill} 
// //                       variant="contained" 
// //                       color="primary"
// //                       disabled={!currentSkill.trim()}
// //                       sx={{ ml: 1, borderRadius: 1.5, height: 56 }}
// //                     >
// //                       Add
// //                     </Button>
// //                   </Box>
// //                 </Box>
                
// //                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
// //                   {skillsArray.map((skill, index) => (
// //                     <Chip
// //                       key={index}
// //                       label={skill}
// //                       onDelete={() => removeSkill(skill)}
// //                       color="primary"
// //                       variant="outlined"
// //                     />
// //                   ))}
// //                   {skillsArray.length === 0 && (
// //                     <Typography variant="body2" color="text.secondary">
// //                       No skills added yet. Add skills to help candidates understand the requirements.
// //                     </Typography>
// //                   )}
// //                 </Box>
// //               </Grid>
              
// //               <Grid item xs={12}>
// //                 <TextField
// //                   fullWidth
// //                   label="Job Description"
// //                   name="description"
// //                   value={formData.description}
// //                   onChange={handleChange}
// //                   error={!!errors.description}
// //                   helperText={errors.description || "Minimum 50 characters. Include responsibilities, requirements, and benefits."}
// //                   multiline
// //                   rows={8}
// //                   required
// //                   variant="outlined"
// //                   InputProps={{
// //                     sx: { borderRadius: 1.5 }
// //                   }}
// //                   placeholder="Describe the job responsibilities, requirements, qualifications, and benefits in detail..."
// //                 />
// //               </Grid>
// //             </Grid>
// //           </Box>
// //         );
      
// //       case 2:
// //         return (
// //           <Box>
// //             <Typography variant="h6" color="primary" gutterBottom>
// //               Review Job Posting
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary" paragraph>
// //               Please review all information before posting.
// //             </Typography>
            
// //             <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
// //               <CardContent>
// //                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
// //                   <Typography variant="h5" component="div" gutterBottom>
// //                     {formData.title || 'Job Title'}
// //                   </Typography>
// //                   <Chip 
// //                     label={jobTypes.find(type => type.value === formData.jobType)?.label || formData.jobType}
// //                     color="primary"
// //                     size="small"
// //                   />
// //                 </Box>
                
// //                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //                   <Business fontSize="small" color="action" sx={{ mr: 1 }} />
// //                   <Typography variant="body1">
// //                     {formData.company || 'Company Name'}
// //                   </Typography>
// //                 </Box>
                
// //                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// //                   <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
// //                   <Typography variant="body1">
// //                     {formData.location || 'Location'}
// //                   </Typography>
// //                 </Box>
                
// //                 {formData.salary && (
// //                   <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// //                     <AttachMoney fontSize="small" color="action" sx={{ mr: 1 }} />
// //                     <Typography variant="body1">
// //                       {formData.salary}
// //                     </Typography>
// //                   </Box>
// //                 )}
                
// //                 <Divider sx={{ my: 2 }} />
                
// //                 <Typography variant="subtitle1" gutterBottom>
// //                   Required Skills:
// //                 </Typography>
// //                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
// //                   {skillsArray.length > 0 ? (
// //                     skillsArray.map((skill, index) => (
// //                       <Chip key={index} label={skill} size="small" />
// //                     ))
// //                   ) : (
// //                     <Typography variant="body2" color="text.secondary">
// //                       No specific skills listed
// //                     </Typography>
// //                   )}
// //                 </Box>
                
// //                 <Divider sx={{ my: 2 }} />
                
// //                 <Typography variant="subtitle1" gutterBottom>
// //                   Job Description:
// //                 </Typography>
// //                 <Typography variant="body2" paragraph sx={{ whiteSpace: 'pre-line' }}>
// //                   {formData.description || 'No description provided.'}
// //                 </Typography>
// //               </CardContent>
// //             </Card>
// //           </Box>
// //         );
      
// //       default:
// //         return 'Unknown step';
// //     }
// //   };

// //   return (
// //     <Container maxWidth="md" sx={{ py: 4 }}>
// //       <Paper 
// //         elevation={3} 
// //         sx={{ 
// //           p: { xs: 2, sm: 4 },
// //           borderRadius: 2,
// //           boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
// //         }}
// //       >
// //         <Box sx={{ mb: 4 }}>
// //           <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
// //             Post a New Job Opportunity
// //           </Typography>
// //           <Typography variant="body1" color="text.secondary">
// //             Fill out the form below to create a new job posting and find the perfect candidate.
// //           </Typography>
// //         </Box>
        
// //         <Stepper 
// //           activeStep={activeStep} 
// //           alternativeLabel={!isMobile}
// //           orientation={isMobile ? "vertical" : "horizontal"}
// //           sx={{ mb: 4 }}
// //         >
// //           {steps.map((label) => (
// //             <Step key={label}>
// //               <StepLabel>{label}</StepLabel>
// //             </Step>
// //           ))}
// //         </Stepper>
        
// //         <Divider sx={{ mb: 4 }} />
        
// //         <form onSubmit={(e) => { e.preventDefault(); if (activeStep === steps.length - 1) handleSubmit(); else handleNext(); }}>
// //           <Box sx={{ mb: 4 }}>
// //             {getStepContent(activeStep)}
// //           </Box>
          
// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
// //             <Button
// //               disabled={activeStep === 0}
// //               onClick={handleBack}
// //               startIcon={<ArrowBack />}
// //               variant="outlined"
// //               sx={{ borderRadius: 1.5 }}
// //             >
// //               Back
// //             </Button>
// //             <Box>
// //               {activeStep === steps.length - 1 ? (
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   type="submit"
// //                   disabled={loading}
// //                   startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Check />}
// //                   sx={{ 
// //                     borderRadius: 1.5,
// //                     px: 4,
// //                     py: 1.2,
// //                     boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
// //                   }}
// //                 >
// //                   {loading ? 'Posting...' : 'Post Job'}
// //                 </Button>
// //               ) : (
// //                 <Button
// //                   variant="contained"
// //                   color="primary"
// //                   onClick={handleNext}
// //                   endIcon={<ArrowForward />}
// //                   sx={{ 
// //                     borderRadius: 1.5,
// //                     px: 3
// //                   }}
// //                 >
// //                   Next
// //                 </Button>
// //               )}
// //             </Box>
// //           </Box>
// //         </form>
// //       </Paper>

// //       <Snackbar
// //         open={alert.open}
// //         autoHideDuration={6000}
// //         onClose={handleCloseAlert}
// //         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
// //       >
// //         <Alert 
// //           onClose={handleCloseAlert} 
// //           severity={alert.severity}
// //           variant="filled"
// //           sx={{ width: '100%' }}
// //         >
// //           {alert.message}
// //         </Alert>
// //       </Snackbar>
// //     </Container>
// //   );
// // };

// // export default PostJob;

// import React, { useState } from 'react';
//    import axios from 'axios';
//    import { useNavigate } from 'react-router-dom';
//    import {
//      TextField,
//      Button,
//      Select,
//      MenuItem,
//      FormControl,
//      InputLabel,
//      Alert,
//      Snackbar,
//      CircularProgress,
//      Paper,
//      Typography,
//      Container,
//      Box,
//      Grid,
//      Divider,
//      Chip,
//      IconButton,
//      Tooltip,
//      Card,
//      CardContent,
//      FormHelperText,
//      InputAdornment,
//      useTheme,
//      useMediaQuery,
//      Stepper,
//      Step,
//      StepLabel,
//      Input
//    } from '@mui/material';
//    import {
//      Work,
//      Business,
//      LocationOn,
//      AttachMoney,
//      Description,
//      Code,
//      Info,
//      ArrowBack,
//      ArrowForward,
//      Check,
//      HelpOutline,
//      AccessTime,
//      Image
//    } from '@mui/icons-material';
//    import "../../styles/PostJob.css";

//    const PostJob = ({ onSuccess }) => {
//      const [formData, setFormData] = useState({
//        title: '',
//        company: '',
//        location: '',
//        description: '',
//        salary: '',
//        jobType: 'full-time',
//        skills: ''
//      });
//      const [photo, setPhoto] = useState(null); // New state for the photo file
//      const [photoError, setPhotoError] = useState(''); // Error state for photo validation
//      const [errors, setErrors] = useState({});
//      const [loading, setLoading] = useState(false);
//      const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
//      const [activeStep, setActiveStep] = useState(0);
//      const [skillsArray, setSkillsArray] = useState([]);
//      const [currentSkill, setCurrentSkill] = useState('');
  
//      const navigate = useNavigate();
//      const theme = useTheme();
//      const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//      const jobTypes = [
//        { value: 'full-time', label: 'Full-time', icon: <AccessTime fontSize="small" /> },
//        { value: 'part-time', label: 'Part-time', icon: <AccessTime fontSize="small" /> },
//        { value: 'contract', label: 'Contract', icon: <AccessTime fontSize="small" /> },
//        { value: 'internship', label: 'Internship', icon: <AccessTime fontSize="small" /> },
//        { value: 'remote', label: 'Remote', icon: <LocationOn fontSize="small" /> }
//      ];

//      const steps = [
//        'Basic Information',
//        'Job Details',
//        'Review & Post'
//      ];

//      const handleChange = (e) => {
//        const { name, value } = e.target;
//        setFormData({
//          ...formData,
//          [name]: value
//        });
//        if (errors[name]) {
//          setErrors({ ...errors, [name]: '' });
//        }
//      };

//      const handlePhotoChange = (e) => {
//        const file = e.target.files[0];
//        if (file) {
//          // Validate file type (only images)
//          const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
//          if (!validTypes.includes(file.type)) {
//            setPhotoError('Please upload a valid image file (JPEG, PNG, or GIF)');
//            setPhoto(null);
//            return;
//          }
//          // Validate file size (e.g., max 5MB)
//          const maxSize = 5 * 1024 * 1024; // 5MB in bytes
//          if (file.size > maxSize) {
//            setPhotoError('File size exceeds 5MB limit');
//            setPhoto(null);
//            return;
//          }
//          setPhotoError('');
//          setPhoto(file);
//        }
//      };

//      const handleSkillInputChange = (e) => {
//        setCurrentSkill(e.target.value);
//      };

//      const handleSkillInputKeyDown = (e) => {
//        if (e.key === 'Enter' && currentSkill.trim()) {
//          e.preventDefault();
//          addSkill();
//        }
//      };

//      const addSkill = () => {
//        if (currentSkill.trim() && !skillsArray.includes(currentSkill.trim())) {
//          const newSkills = [...skillsArray, currentSkill.trim()];
//          setSkillsArray(newSkills);
//          setFormData({
//            ...formData,
//            skills: newSkills.join(',')
//          });
//          setCurrentSkill('');
//        }
//      };

//      const removeSkill = (skillToRemove) => {
//        const newSkills = skillsArray.filter(skill => skill !== skillToRemove);
//        setSkillsArray(newSkills);
//        setFormData({
//          ...formData,
//          skills: newSkills.join(',')
//        });
//      };

//      const validateStep = (step) => {
//        const newErrors = {};
    
//        if (step === 0) {
//          if (!formData.title.trim()) newErrors.title = 'Job title is required';
//          if (!formData.company.trim()) newErrors.company = 'Company name is required';
//          if (!formData.location.trim()) newErrors.location = 'Location is required';
//        } else if (step === 1) {
//          if (!formData.description.trim()) newErrors.description = 'Description is required';
//          if (formData.description.length < 50) newErrors.description = 'Description should be at least 50 characters';
//          if (formData.salary && !/^\d+(\.\d{1,2})?$/.test(formData.salary)) {
//            newErrors.salary = 'Enter valid salary (numbers only)';
//          }
//        }
    
//        setErrors(newErrors);
//        return Object.keys(newErrors).length === 0;
//      };

//      const handleNext = () => {
//        if (validateStep(activeStep)) {
//          setActiveStep((prevStep) => prevStep + 1);
//        }
//      };

//      const handleBack = () => {
//        setActiveStep((prevStep) => prevStep - 1);
//      };

//      const validate = () => {
//        const newErrors = {};
//        if (!formData.title.trim()) newErrors.title = 'Job title is required';
//        if (!formData.company.trim()) newErrors.company = 'Company name is required';
//        if (!formData.location.trim()) newErrors.location = 'Location is required';
//        if (!formData.description.trim()) newErrors.description = 'Description is required';
//        if (formData.description.length < 50) newErrors.description = 'Description should be at least 50 characters';
//        if (formData.salary && !/^\d+(\.\d{1,2})?$/.test(formData.salary)) {
//          newErrors.salary = 'Enter valid salary (numbers only)';
//        }
//        setErrors(newErrors);
//        return Object.keys(newErrors).length === 0;
//      };

//      const handleSubmit = async (e) => {
//        if (e) e.preventDefault();
//        if (!validate()) return;

//        setLoading(true);
//        try {
//          const token = localStorage.getItem('token');
//          const formDataWithFile = new FormData();
//          // Append form fields
//          formDataWithFile.append('title', formData.title);
//          formDataWithFile.append('company', formData.company);
//          formDataWithFile.append('location', formData.location);
//          formDataWithFile.append('description', formData.description);
//          formDataWithFile.append('salary', formData.salary);
//          formDataWithFile.append('jobType', formData.jobType);
//          formDataWithFile.append('skills', formData.skills);
//          formDataWithFile.append('posted_by', localStorage.getItem('userId'));
//          // Append the photo file if it exists
//          if (photo) {
//            formDataWithFile.append('photo', photo);
//          }

//          const response = await axios.post('http://localhost:5000/api/jobs', 
//            formDataWithFile,
//            {
//              headers: {
//                Authorization: `Bearer ${token}`,
//                'Content-Type': 'multipart/form-data'
//              }
//            }
//          );

//          setAlert({
//            open: true,
//            message: 'Job posted successfully!',
//            severity: 'success'
//          });
      
//          // Reset form after successful submission
//          setFormData({
//            title: '',
//            company: '',
//            location: '',
//            description: '',
//            salary: '',
//            jobType: 'full-time',
//            skills: ''
//          });
//          setSkillsArray([]);
//          setPhoto(null); // Reset photo state
//          setActiveStep(0);

//          if (onSuccess) {
//            onSuccess();
//          } else {
//            setTimeout(() => navigate('/recruiter-dashboard'), 1500);
//          }
//        } catch (error) {
//          let message = 'Failed to post job';
//          if (error.response) {
//            if (error.response.status === 401) {
//              message = 'Please login to post jobs';
//            } else if (error.response.data?.message) {
//              message = error.response.data.message;
//            }
//          }
//          setAlert({
//            open: true,
//            message,
//            severity: 'error'
//          });
//        } finally {
//          setLoading(false);
//        }
//      };

//      const handleCloseAlert = () => {
//        setAlert({ ...alert, open: false });
//      };

//      const getStepContent = (step) => {
//        switch (step) {
//          case 0:
//            return (
//              <Box>
//                <Typography variant="h6" color="primary" gutterBottom>
//                  Basic Job Information
//                </Typography>
//                <Typography variant="body2" color="text.secondary" paragraph>
//                  Start by providing the essential details about the position.
//                </Typography>
            
//                <Grid container spacing={3}>
//                  <Grid item xs={12}>
//                    <TextField
//                      fullWidth
//                      label="Job Title"
//                      name="title"
//                      value={formData.title}
//                      onChange={handleChange}
//                      error={!!errors.title}
//                      helperText={errors.title}
//                      required
//                      variant="outlined"
//                      InputProps={{
//                        startAdornment: (
//                          <InputAdornment position="start">
//                            <Work color="action" />
//                          </InputAdornment>
//                        ),
//                        sx: { borderRadius: 1.5 }
//                      }}
//                      placeholder="e.g. Senior Software Engineer"
//                    />
//                  </Grid>
              
//                  <Grid item xs={12} md={6}>
//                    <TextField
//                      fullWidth
//                      label="Company Name"
//                      name="company"
//                      value={formData.company}
//                      onChange={handleChange}
//                      error={!!errors.company}
//                      helperText={errors.company}
//                      required
//                      variant="outlined"
//                      InputProps={{
//                        startAdornment: (
//                          <InputAdornment position="start">
//                            <Business color="action" />
//                          </InputAdornment>
//                        ),
//                        sx: { borderRadius: 1.5 }
//                      }}
//                      placeholder="e.g. Tech Innovations Inc."
//                    />
//                  </Grid>
              
//                  <Grid item xs={12} md={6}>
//                    <TextField
//                      fullWidth
//                      label="Location"
//                      name="location"
//                      value={formData.location}
//                      onChange={handleChange}
//                      error={!!errors.location}
//                      helperText={errors.location}
//                      required
//                      variant="outlined"
//                      InputProps={{
//                        startAdornment: (
//                          <InputAdornment position="start">
//                            <LocationOn color="action" />
//                          </InputAdornment>
//                        ),
//                        sx: { borderRadius: 1.5 }
//                      }}
//                      placeholder="e.g. New York, NY or Remote"
//                    />
//                  </Grid>
              
//                  <Grid item xs={12}>
//                    <FormControl fullWidth variant="outlined" error={!!errors.jobType}>
//                      <InputLabel>Job Type</InputLabel>
//                      <Select
//                        name="jobType"
//                        value={formData.jobType}
//                        onChange={handleChange}
//                        label="Job Type"
//                        sx={{ borderRadius: 1.5 }}
//                      >
//                        {jobTypes.map(type => (
//                          <MenuItem key={type.value} value={type.value}>
//                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                              {type.icon}
//                              <Box sx={{ ml: 1 }}>{type.label}</Box>
//                            </Box>
//                          </MenuItem>
//                        ))}
//                      </Select>
//                      {errors.jobType && <FormHelperText>{errors.jobType}</FormHelperText>}
//                    </FormControl>
//                  </Grid>
//                </Grid>
//              </Box>
//            );
      
//          case 1:
//            return (
//              <Box>
//                <Typography variant="h6" color="primary" gutterBottom>
//                  Detailed Job Information
//                </Typography>
//                <Typography variant="body2" color="text.secondary" paragraph>
//                  Provide more details to attract the right candidates.
//                </Typography>
            
//                <Grid container spacing={3}>
//                  <Grid item xs={12}>
//                    <TextField
//                      fullWidth
//                      label="Salary (optional)"
//                      name="salary"
//                      value={formData.salary}
//                      onChange={handleChange}
//                      error={!!errors.salary}
//                      helperText={errors.salary}
//                      variant="outlined"
//                      InputProps={{
//                        startAdornment: (
//                          <InputAdornment position="start">
//                            <AttachMoney color="action" />
//                          </InputAdornment>
//                        ),
//                        sx: { borderRadius: 1.5 }
//                      }}
//                      placeholder="e.g. 50000 or 25.50/hour"
//                    />
//                  </Grid>
              
//                  <Grid item xs={12}>
//                    <Typography variant="subtitle2" gutterBottom>
//                      Job Photo (optional)
//                    </Typography>
//                    <Input
//                      type="file"
//                      onChange={handlePhotoChange}
//                      inputProps={{ accept: "image/jpeg,image/png,image/gif" }}
//                      fullWidth
//                      disableUnderline
//                      sx={{ mb: 1 }}
//                    />
//                    {photo && (
//                      <Typography variant="body2" color="text.secondary">
//                        Selected: {photo.name}
//                      </Typography>
//                    )}
//                    {photoError && (
//                      <Typography variant="body2" color="error">
//                        {photoError}
//                      </Typography>
//                    )}
//                  </Grid>
              
//                  <Grid item xs={12}>
//                    <Box sx={{ mb: 1 }}>
//                      <Typography variant="subtitle2" gutterBottom>
//                        Required Skills
//                      </Typography>
//                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                        <TextField
//                          fullWidth
//                          value={currentSkill}
//                          onChange={handleSkillInputChange}
//                          onKeyDown={handleSkillInputKeyDown}
//                          placeholder="Type a skill and press Enter"
//                          variant="outlined"
//                          InputProps={{
//                            startAdornment: (
//                              <InputAdornment position="start">
//                                <Code color="action" />
//                              </InputAdornment>
//                            ),
//                            sx: { borderRadius: 1.5 }
//                          }}
//                        />
//                        <Button 
//                          onClick={addSkill} 
//                          variant="contained" 
//                          color="primary"
//                          disabled={!currentSkill.trim()}
//                          sx={{ ml: 1, borderRadius: 1.5, height: 56 }}
//                        >
//                          Add
//                        </Button>
//                      </Box>
//                    </Box>
                
//                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
//                      {skillsArray.map((skill, index) => (
//                        <Chip
//                          key={index}
//                          label={skill}
//                          onDelete={() => removeSkill(skill)}
//                          color="primary"
//                          variant="outlined"
//                        />
//                      ))}
//                      {skillsArray.length === 0 && (
//                        <Typography variant="body2" color="text.secondary">
//                          No skills added yet. Add skills to help candidates understand the requirements.
//                        </Typography>
//                      )}
//                    </Box>
//                  </Grid>
              
//                  <Grid item xs={12}>
//                    <TextField
//                      fullWidth
//                      label="Job Description"
//                      name="description"
//                      value={formData.description}
//                      onChange={handleChange}
//                      error={!!errors.description}
//                      helperText={errors.description || "Minimum 50 characters. Include responsibilities, requirements, and benefits."}
//                      multiline
//                      rows={8}
//                      required
//                      variant="outlined"
//                      InputProps={{
//                        sx: { borderRadius: 1.5 }
//                      }}
//                      placeholder="Describe the job responsibilities, requirements, qualifications, and benefits in detail..."
//                    />
//                  </Grid>
//                </Grid>
//              </Box>
//            );
      
//          case 2:
//            return (
//              <Box>
//                <Typography variant="h6" color="primary" gutterBottom>
//                  Review Job Posting
//                </Typography>
//                <Typography variant="body2" color="text.secondary" paragraph>
//                  Please review all information before posting.
//                </Typography>
            
//                <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
//                  <CardContent>
//                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//                      <Typography variant="h5" component="div" gutterBottom>
//                        {formData.title || 'Job Title'}
//                      </Typography>
//                      <Chip 
//                        label={jobTypes.find(type => type.value === formData.jobType)?.label || formData.jobType}
//                        color="primary"
//                        size="small"
//                      />
//                    </Box>
                
//                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                      <Business fontSize="small" color="action" sx={{ mr: 1 }} />
//                      <Typography variant="body1">
//                        {formData.company || 'Company Name'}
//                      </Typography>
//                    </Box>
                
//                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                      <LocationOn fontSize="small" color="action" sx={{ mr: 1 }} />
//                      <Typography variant="body1">
//                        {formData.location || 'Location'}
//                      </Typography>
//                    </Box>
                
//                    {formData.salary && (
//                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                        <AttachMoney fontSize="small" color="action" sx={{ mr: 1 }} />
//                        <Typography variant="body1">
//                          {formData.salary}
//                        </Typography>
//                      </Box>
//                    )}
                
//                    {photo && (
//                      <Box sx={{ mb: 2 }}>
//                        <Typography variant="subtitle1" gutterBottom>
//                          Job Photo:
//                        </Typography>
//                        <Typography variant="body2" color="text.secondary">
//                          {photo.name}
//                        </Typography>
//                      </Box>
//                    )}
                
//                    <Divider sx={{ my: 2 }} />
                
//                    <Typography variant="subtitle1" gutterBottom>
//                      Required Skills:
//                    </Typography>
//                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
//                      {skillsArray.length > 0 ? (
//                        skillsArray.map((skill, index) => (
//                          <Chip key={index} label={skill} size="small" />
//                        ))
//                      ) : (
//                        <Typography variant="body2" color="text.secondary">
//                          No specific skills listed
//                        </Typography>
//                      )}
//                    </Box>
                
//                    <Divider sx={{ my: 2 }} />
                
//                    <Typography variant="subtitle1" gutterBottom>
//                      Job Description:
//                    </Typography>
//                    <Typography variant="body2" paragraph sx={{ whiteSpace: 'pre-line' }}>
//                      {formData.description || 'No description provided.'}
//                    </Typography>
//                  </CardContent>
//                </Card>
//              </Box>
//            );
      
//          default:
//            return 'Unknown step';
//        }
//      };

//      return (
//        <Container maxWidth="md" sx={{ py: 4 }}>
//          <Paper 
//            elevation={3} 
//            sx={{ 
//              p: { xs: 2, sm: 4 },
//              borderRadius: 2,
//              boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
//            }}
//          >
//            <Box sx={{ mb: 4 }}>
//              <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
//                Post a New Job Opportunity
//              </Typography>
//              <Typography variant="body1" color="text.secondary">
//                Fill out the form below to create a new job posting and find the perfect candidate.
//              </Typography>
//            </Box>
        
//            <Stepper 
//              activeStep={activeStep} 
//              alternativeLabel={!isMobile}
//              orientation={isMobile ? "vertical" : "horizontal"}
//              sx={{ mb: 4 }}
//            >
//              {steps.map((label) => (
//                <Step key={label}>
//                  <StepLabel>{label}</StepLabel>
//                </Step>
//              ))}
//            </Stepper>
        
//            <Divider sx={{ mb: 4 }} />
        
//            <form onSubmit={(e) => { e.preventDefault(); if (activeStep === steps.length - 1) handleSubmit(); else handleNext(); }}>
//              <Box sx={{ mb: 4 }}>
//                {getStepContent(activeStep)}
//              </Box>
          
//              <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
//                <Button
//                  disabled={activeStep === 0}
//                  onClick={handleBack}
//                  startIcon={<ArrowBack />}
//                  variant="outlined"
//                  sx={{ borderRadius: 1.5 }}
//                >
//                  Back
//                </Button>
//                <Box>
//                  {activeStep === steps.length - 1 ? (
//                    <Button
//                      variant="contained"
//                      color="primary"
//                      type="submit"
//                      disabled={loading}
//                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Check />}
//                      sx={{ 
//                        borderRadius: 1.5,
//                        px: 4,
//                        py: 1.2,
//                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
//                      }}
//                    >
//                      {loading ? 'Posting...' : 'Post Job'}
//                    </Button>
//                  ) : (
//                    <Button
//                      variant="contained"
//                      color="primary"
//                      onClick={handleNext}
//                      endIcon={<ArrowForward />}
//                      sx={{ 
//                        borderRadius: 1.5,
//                        px: 3
//                      }}
//                    >
//                      Next
//                    </Button>
//                  )}
//                </Box>
//              </Box>
//            </form>
//          </Paper>

//          <Snackbar
//            open={alert.open}
//            autoHideDuration={6000}
//            onClose={handleCloseAlert}
//            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//          >
//            <Alert 
//              onClose={handleCloseAlert} 
//              severity={alert.severity}
//              variant="filled"
//              sx={{ width: '100%' }}
//            >
//              {alert.message}
//            </Alert>
//          </Snackbar>
//        </Container>
//      );
//    };

//    export default PostJob;

"use client"

import { useState } from "react"
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  FormHelperText,
  InputAdornment,
} from "@mui/material"
import { LocationOn, Business, AttachMoney, Description, AccessTime, Upload, Image } from "@mui/icons-material"
import axios from "axios"

const jobTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship", "Remote"]

const PostJob = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    job_type: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
  })

  const [jobImage, setJobImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [photoError, setPhotoError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image size should be less than 5MB",
        }))
        return
      }

      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please upload an image file",
        }))
        return
      }

      setJobImage(file)
      setImagePreview(URL.createObjectURL(file))
      setErrors((prev) => ({
        ...prev,
        image: null,
      }))
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 5 * 1024 * 1024) {
      setPhoto(file)
      setPhotoError(null)
    } else {
      setPhoto(null)
      setPhotoError("Photo must be less than 5MB")
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = "Job title is required"
    if (!formData.company.trim()) newErrors.company = "Company name is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.job_type) newErrors.job_type = "Job type is required"
    if (!formData.description.trim()) newErrors.description = "Job description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      // Create FormData object to handle file upload
      const formDataToSend = new FormData()

      // Add all text fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key])
      })

      // Add image if exists
      if (jobImage) {
        formDataToSend.append("job_image", jobImage)
      }

      const response = await axios.post("http://localhost:5000/api/jobs", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 201) {
        onSuccess()
      }
    } catch (err) {
      console.error("Error posting job:", err)
      setSubmitError(err.response?.data?.error || err.message || "Failed to post job. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {submitError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1565c0" }}>
            Basic Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description fontSize="small" sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            error={Boolean(errors.company)}
            helperText={errors.company}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business fontSize="small" sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={Boolean(errors.location)}
            helperText={errors.location}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn fontSize="small" sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl
            fullWidth
            required
            error={Boolean(errors.job_type)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          >
            <InputLabel>Job Type</InputLabel>
            <Select
              name="job_type"
              value={formData.job_type}
              onChange={handleChange}
              label="Job Type"
              startAdornment={
                <InputAdornment position="start">
                  <AccessTime fontSize="small" sx={{ color: "#1976d2", mr: 1 }} />
                </InputAdornment>
              }
            >
              {jobTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.job_type && <FormHelperText>{errors.job_type}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Salary (Optional)"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. $50,000 - $70,000 per year"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney fontSize="small" sx={{ color: "#1976d2" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: "2px dashed",
              borderColor: photoError ? "error.main" : "primary.light",
              borderRadius: 2,
              p: 3,
              textAlign: "center",
              cursor: "pointer",
              bgcolor: "background.paper",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "rgba(25, 118, 210, 0.04)",
              },
            }}
            onClick={() => document.getElementById("job-photo-input").click()}
          >
            <input
              id="job-photo-input"
              type="file"
              onChange={handlePhotoChange}
              accept="image/jpeg,image/png,image/gif"
              style={{ display: "none" }}
            />
            <Image sx={{ fontSize: 40, color: "primary.main", mb: 1 }} />
            <Typography variant="body1" gutterBottom>
              {photo ? photo.name : "Click or drag to upload job photo"}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Supported formats: JPEG, PNG, GIF (Max: 5MB)
            </Typography>
          </Box>
          {photo && (
            <Box sx={{ mt: 2, mb: 2, border: "1px solid #e0e0e0", borderRadius: 1, p: 1, maxWidth: 300 }}>
              <img
                src={URL.createObjectURL(photo) || "/placeholder.svg"}
                alt="Job photo preview"
                style={{ width: "100%", height: "auto", borderRadius: 4 }}
              />
            </Box>
          )}
          {photo && (
            <Button variant="outlined" color="error" size="small" onClick={() => setPhoto(null)} sx={{ mt: 1 }}>
              Remove Photo
            </Button>
          )}
          {errors.image && (
            <FormHelperText error sx={{ ml: 2 }}>
              {errors.image}
            </FormHelperText>
          )}
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: "#1565c0", mt: 2 }}>
            Job Details
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            multiline
            rows={6}
            label="Job Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
            helperText={errors.description}
            placeholder="Describe the responsibilities, qualifications, and other important details about the job"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Requirements (Optional)"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="List the skills, experience, and qualifications required for this position"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Benefits (Optional)"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            placeholder="Describe the benefits, perks, and advantages of working in this position"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Upload />}
            sx={{
              borderRadius: 2,
              py: 1.5,
              px: 4,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)",
              },
            }}
          >
            {loading ? "Posting..." : "Post Job"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PostJob
