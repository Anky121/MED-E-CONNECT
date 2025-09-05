{/* <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} /> */}
            // <Route path="/register" element={<Register />} />
            // <Route path="/doctors" element={<DoctorList />} />
            <Route 
              path="/patient-dashboard" 
              element={
                <ProtectedRoute role="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-dashboard" 
              element={
                <ProtectedRoute role="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/appointment" 
              element={
                <ProtectedRoute>
                  <Appointment />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/consultation/:appointmentId" 
              element={
                <ProtectedRoute>
                  <Consultation />
                </ProtectedRoute>
              } 
            />