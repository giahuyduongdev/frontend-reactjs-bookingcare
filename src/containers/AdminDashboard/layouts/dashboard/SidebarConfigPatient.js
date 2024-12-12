// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfigDoctor = [
  {
    title: "Manage My appointment",
    path: "/admin-dashboard/patient/manage-appointment-patient",
    icon: getIcon("healthicons:i-schedule-school-date-time"),
  },
];

export default sidebarConfigDoctor;
