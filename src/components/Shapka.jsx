import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import supabase from "../supabase";
import "./Shapka.css";

function Shapka({ korystuvach }) {
  return (
    <header className="shapka">
      <div className="logo">🧳 Мій розумний тревелог</div>
      <div className="korystuvach">
        <span className="pochta">{korystuvach.email}</span>
        <Button
          size="small"
          icon={<LogoutOutlined />}
          onClick={() => {
            supabase.auth.signOut();
          }}
        >
          Вийти
        </Button>
      </div>
    </header>
  );
}

export default Shapka;
