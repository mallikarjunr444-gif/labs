import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, User, Mail, Phone, Users2 } from 'lucide-react';

export const UploadDashboard: React.FC = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    mobileNumber: '',
    email: '',
  });

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="upload" className="relative min-h-screen bg-white py-24 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-b from-accent-blue/15 to-transparent rounded-full blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-accent-blue text-sm font-semibold uppercase tracking-widest mb-4">Analysis Dashboard</p>
          <h2 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">Upload Your Skin Image</h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Share your skin image and patient information to get an instant clinical analysis
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Upload Area */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Drag & Drop Area */}
            <motion.div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden cursor-pointer group ${
                isDragActive
                  ? 'border-accent-blue bg-cyan-glow/10'
                  : uploadedImage
                  ? 'border-accent-blue/50 bg-white/5'
                  : 'border-white/20 hover:border-accent-blue/50 hover:bg-white/5'
              }`}
            >
              <div className="relative aspect-square flex flex-col items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  {uploadedImage ? (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center space-y-6 py-12"
                    >
                      <motion.div
                        className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent-blue/30 to-cyan-glow/20 flex items-center justify-center group-hover:shadow-glow-md transition-all duration-300"
                        animate={{ scale: isDragActive ? 1.1 : 1 }}
                      >
                        <Upload className="w-8 h-8 text-accent-blue" />
                      </motion.div>

                      <div>
                        <h3 className="text-2xl font-bold text-text-primary mb-2">Drag & drop your image</h3>
                        <p className="text-text-secondary">or click to select from your computer</p>
                      </div>

                      <p className="text-gray-500 text-sm">PNG, JPG up to 10MB</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDragActive ? 0.3 : 0,
                  boxShadow: isDragActive ? '0 0 40px rgba(0, 240, 255, 0.5)' : 'none',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {uploadedImage && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setUploadedImage(null)}
                className="text-accent-blue text-sm font-medium hover:text-cyan-300 transition-colors"
              >
                ← Change Image
              </motion.button>
            )}
          </motion.div>

          {/* Patient Form */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-xl p-8 md:p-12"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-8">Patient Information</h3>

            <form className="space-y-6">
              {[
                { icon: User, name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                { icon: Users2, name: 'age', label: 'Age', type: 'number', placeholder: '30' },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                    <field.icon size={16} className="text-accent-blue" />
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleFormChange}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all duration-300"
                  />
                </motion.div>
              ))}

              {/* Gender Select */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-text-secondary mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleFormChange}
                  className="w-full rounded-lg bg-white/5 border border-white/10 text-text-primary px-4 py-3 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all duration-300"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              {[
                { icon: Phone, name: 'mobileNumber', label: 'Mobile Number', placeholder: '+1 (555) 123-4567' },
                { icon: Mail, name: 'email', label: 'Email Address', placeholder: 'your@email.com' },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 2) * 0.05 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
                    <field.icon size={16} className="text-accent-blue" />
                    {field.label}
                  </label>
                  <input
                    type={field.name === 'email' ? 'email' : 'text'}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleFormChange}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg bg-white/5 border border-white/10 text-text-primary placeholder-gray-500 px-4 py-3 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-cyan-glow/20 transition-all duration-300"
                  />
                </motion.div>
              ))}

              {/* Submit Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                disabled={!uploadedImage || !formData.fullName || !formData.email}
                className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-accent-blue to-cyan-glow text-medical-blue rounded-lg font-bold shadow-glow-lg hover:shadow-glow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Analysis
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
