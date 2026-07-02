import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f7f7f5",
          color: "#0a0a0a",
          padding: "72px",
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 28,
            fontWeight: 700
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#0a0a0a"
            }}
          />
          AI Number Lab
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <div
            style={{
              fontSize: 86,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: 0,
              maxWidth: 900
            }}
          >
            AI 手机号娱乐测评
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              color: "#525252",
              maxWidth: 840
            }}
          >
            输入手机号，生成一份 AI 娱乐分析报告，仅供娱乐参考。
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #d4d4d4",
            paddingTop: "30px",
            fontSize: 26,
            color: "#404040"
          }}
        >
          <span>号码结构</span>
          <span>易记程度</span>
          <span>娱乐偏好</span>
        </div>
      </div>
    ),
    size
  );
}
