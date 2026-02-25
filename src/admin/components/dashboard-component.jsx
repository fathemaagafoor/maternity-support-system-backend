import { Box, H2, H5, Icon, Text } from "@adminjs/design-system";

const sections = [
  {
    title: "Auth Users",
    description: "Manage registered users and admin-access accounts.",
    icon: "User",
    href: "/admin/resources/Auth",
  },
  {
    title: "Doctors",
    description: "Manage doctor profiles, shift, and hospital assignment.",
    icon: "Stethoscope",
    href: "/admin/resources/Doctors",
  },
  {
    title: "Caregivers",
    description: "Review caregiver availability, pricing, and approvals.",
    icon: "Users",
    href: "/admin/resources/Caregiver",
  },
  {
    title: "Mothers",
    description: "Maintain mother profiles and pregnancy information.",
    icon: "Heart",
    href: "/admin/resources/Mother",
  },
  {
    title: "Babies",
    description: "Manage baby records, growth logs, and linked mother.",
    icon: "Smile",
    href: "/admin/resources/Baby",
  },
  {
    title: "Caregiver Bookings",
    description: "Monitor caregiver booking requests and outcomes.",
    icon: "Clipboard",
    href: "/admin/resources/CaregiverBooking",
  },
  {
    title: "Hospitals",
    description: "Update hospital details, location, and address data.",
    icon: "Home",
    href: "/admin/resources/Hospital",
  },
  {
    title: "Vaccines",
    description: "Maintain vaccine catalog and schedule information.",
    icon: "Shield",
    href: "/admin/resources/Vaccine",
  },
  {
    title: "Articles",
    description: "Edit educational content for mothers.",
    icon: "BookOpen",
    href: "/admin/resources/Article",
  },
];

const Dashboard = () => {
  return (
    <Box variant="grey" p={["lg", "xl"]} minHeight="100%">
      <Box className="motherly-dashboard-hero" mb="xl">
        <Box className="motherly-dashboard-logo-wrap" mb="md">
          <Box
            as="img"
            src="/admin-assets/motherly-logo.png"
            alt="Motherly logo"
            className="motherly-dashboard-logo"
          />
        </Box>
        <H2 mb="sm" className="motherly-dashboard-title">
          Motherly Admin
        </H2>
        <Text color="white" opacity={0.92}>
          Welcome back. Use the navigation and quick sections below to manage
          your platform.
        </Text>
      </Box>

      <Box
        className="motherly-dashboard-grid"
        display="grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
      >
        {sections.map((section) => (
          <Box
            key={section.title}
            className="motherly-section-card"
            as="a"
            href={section.href}
            bg="white"
            borderRadius={14}
            p="xl"
            boxShadow="card"
          >
            <Box className="motherly-section-header" mb="md">
              <Box className="motherly-section-icon" mb="sm">
                <Icon icon={section.icon} size={16} />
              </Box>
              <H5 mb="0">{section.title}</H5>
            </Box>
            <Text color="grey60">{section.description}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
