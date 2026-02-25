import { ComponentLoader } from "adminjs";
import { fileURLToPath } from "url";

const componentLoader = new ComponentLoader();

const dashboardComponentPath = fileURLToPath(
  new URL("../admin/components/dashboard-component.jsx", import.meta.url)
);

const loginComponentPath = fileURLToPath(
  new URL("../admin/components/login-component.jsx", import.meta.url)
);

const Components = {
  Dashboard: componentLoader.add("Dashboard", dashboardComponentPath),
};

componentLoader.override("Login", loginComponentPath);

export { componentLoader, Components };
