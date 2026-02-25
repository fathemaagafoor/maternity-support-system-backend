import {
    Box,
    Button,
    H2,
    H5,
    Icon,
    Input,
    Label,
    MessageBox,
    Text,
} from "@adminjs/design-system";

const Login = () => {
  const action = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  const errorMessage = searchParams.get("message");

  return (
    <Box variant="grey" width={1} minHeight="100vh" p={["lg", "xl", "x4"]}>
      <Box
        className="motherly-login-wrapper"
        width={[1, 920]}
        mx="auto"
        mt={["xl", "x3"]}
        bg="white"
        borderRadius={16}
        boxShadow="card"
        overflow="hidden"
        display="grid"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        <Box className="motherly-login-brand" p={["xl", "x4"]}>
          <Box mb="x3">
            <H2 color="white" mb="sm">
              Motherly Admin
            </H2>
            <Text color="white" opacity={0.9}>
              Secure control panel for your maternity support system.
            </Text>
          </Box>

          <Box display="grid" style={{ gap: "12px" }}>
            <Box className="motherly-feature-item">
              <Icon icon="Users" size={16} />
              <Text color="white">Manage doctors, caregivers, and mothers</Text>
            </Box>
            <Box className="motherly-feature-item">
              <Icon icon="Calendar" size={16} />
              <Text color="white">Track caregiver bookings</Text>
            </Box>
            <Box className="motherly-feature-item">
              <Icon icon="BookOpen" size={16} />
              <Text color="white">Maintain articles and vaccines</Text>
            </Box>
          </Box>
        </Box>

        <Box p={["xl", "x4"]}>
          <H5 mb="sm">Welcome back</H5>
          <Text mb="xl" color="grey60">
            Sign in to continue.
          </Text>

          {errorMessage ? (
            <MessageBox mb="lg" message={decodeURIComponent(errorMessage)} />
          ) : null}

          <Box as="form" action={action} method="POST" className="motherly-login-form">
            <Box mb="lg" className="motherly-field-group">
              <Label required>Email</Label>
              <Input name="email" type="email" placeholder="you@example.com" required />
            </Box>

            <Box mb="xl" className="motherly-field-group">
              <Label required>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </Box>

            <Button type="submit" variant="primary" size="lg" width={1}>
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
