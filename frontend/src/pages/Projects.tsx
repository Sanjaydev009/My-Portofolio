import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Fab,
  useScrollTrigger,
  Zoom,
} from '@mui/material';
import { Search, KeyboardArrowUp } from '@mui/icons-material';
import { motion } from 'framer-motion';
import ProjectCard from '../components/common/ProjectCard';
import Loading from '../components/common/Loading';
import ErrorBoundary from '../components/common/ErrorBoundary';
// import { useProjects } from '../hooks';
import { projectService } from '../services/projects';
import { useQuery } from '@tanstack/react-query';
import type { Project } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`projects-tabpanel-${index}`}
      aria-labelledby={`projects-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

const Projects: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  
  const { data: projectsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectService.getProjects(),
  });

  const projects = projectsResponse?.projects || [];

  const categories = ['all', 'web', 'mobile', 'desktop', 'api', 'other'];
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!projects) return;

    let filtered = projects;

    // Filter by category
    if (tabValue > 0) {
      const selectedCategory = categories[tabValue];
      filtered = filtered.filter((project: Project) => project.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((project: Project) =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech: string) => 
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredProjects(filtered);
  }, [projects, tabValue, searchQuery]);

  if (isLoading) {
    return <Loading message="Loading projects..." />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ErrorBoundary
          message="Failed to load projects. Please try again."
          onRetry={refetch}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 2,
          }}
        >
          My Projects
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 6,
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          A collection of projects that showcase my skills and passion for development
        </Typography>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Tabs
            value={tabValue}
            onChange={(_, newValue) => setTabValue(newValue)}
            centered
            sx={{
              '& .MuiTab-root': {
                textTransform: 'capitalize',
                minWidth: 'auto',
                px: 3,
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab
                key={category}
                label={category === 'all' ? 'All Projects' : category}
                id={`projects-tab-${index}`}
                aria-controls={`projects-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>
      </motion.div>

      {/* Projects Grid */}
      {categories.map((category, index) => (
        <TabPanel key={category} value={tabValue} index={index}>
          {filteredProjects.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No projects found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {searchQuery 
                  ? 'Try adjusting your search criteria' 
                  : 'No projects available in this category'
                }
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {filteredProjects.map((project, projectIndex) => (
                <Grid key={project._id} size={{ xs: 12, md: 6, lg: 4 }}>
                  <ProjectCard project={project} index={projectIndex} />
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>
      ))}

      {/* Scroll to Top FAB */}
      <Zoom in={trigger}>
        <Fab
          color="primary"
          size="small"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </Container>
  );
};

export default Projects;
