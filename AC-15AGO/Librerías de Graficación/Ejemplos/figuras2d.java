import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class TransformacionesCanvas extends JFrame {
    private final CanvasPanel canvasPanel;
    private final JComboBox<String> shapeSelect;
    private final JComboBox<String> coordinateType;
    private final JTextField coordinateX;
    private final JTextField coordinateY;
    private final JTextField scaleX;
    private final JTextField scaleY;

    public TransformacionesCanvas() {
        setTitle("Transformaciones en Canvas");
        setSize(600, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        // Panel para controles
        JPanel controlsPanel = new JPanel();
        controlsPanel.setLayout(new GridLayout(0, 2, 5, 5));

        // Selectores y campos de texto
        shapeSelect = new JComboBox<>(new String[]{"Cuadrado", "Círculo", "Triángulo"});
        coordinateType = new JComboBox<>(new String[]{"Cuadráticas (Cartesianas)", "Polares"});
        coordinateX = new JTextField("100");
        coordinateY = new JTextField("100");
        scaleX = new JTextField("1.5");
        scaleY = new JTextField("1.5");

        // Añadir controles al panel
        controlsPanel.add(new JLabel("Figura:"));
        controlsPanel.add(shapeSelect);
        controlsPanel.add(new JLabel("Tipo de coordenadas:"));
        controlsPanel.add(coordinateType);
        controlsPanel.add(new JLabel("Coordenada X / Radio:"));
        controlsPanel.add(coordinateX);
        controlsPanel.add(new JLabel("Coordenada Y / Ángulo (grados):"));
        controlsPanel.add(coordinateY);
        controlsPanel.add(new JLabel("Escalado X:"));
        controlsPanel.add(scaleX);
        controlsPanel.add(new JLabel("Escalado Y:"));
        controlsPanel.add(scaleY);

        JButton updateButton = new JButton("Actualizar");
        updateButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                canvasPanel.repaint();
            }
        });

        // Panel de dibujo
        canvasPanel = new CanvasPanel();

        add(controlsPanel, BorderLayout.NORTH);
        add(canvasPanel, BorderLayout.CENTER);
        add(updateButton, BorderLayout.SOUTH);
    }

    // Panel personalizado para el dibujo
    class CanvasPanel extends JPanel {
        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            Graphics2D g2d = (Graphics2D) g;

            String shape = (String) shapeSelect.getSelectedItem();
            String coordType = (String) coordinateType.getSelectedItem();
            double x = Double.parseDouble(coordinateX.getText());
            double y = Double.parseDouble(coordinateY.getText());
            double sx = Double.parseDouble(scaleX.getText());
            double sy = Double.parseDouble(scaleY.getText());

            // Si las coordenadas son polares, convertirlas a cartesianas
            if ("Polares".equals(coordType)) {
                double angleRadians = Math.toRadians(y);
                double tempX = x * Math.cos(angleRadians);
                double tempY = x * Math.sin(angleRadians);
                x = tempX;
                y = tempY;
            }

            g2d.translate(x + getWidth() / 2, y + getHeight() / 2);
            g2d.scale(sx, sy);

            // Dibuja la figura seleccionada
            g2d.setColor(Color.BLUE);
            switch (shape) {
                case "Círculo":
                    g2d.fillOval(-50, -50, 100, 100);
                    break;
                case "Triángulo":
                    int[] xPoints = {-50, 50, 0};
                    int[] yPoints = {50, 50, -50};
                    g2d.fillPolygon(xPoints, yPoints, 3);
                    break;
                case "Cuadrado":
                default:
                    g2d.fillRect(-50, -50, 100, 100);
                    break;
            }
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            TransformacionesCanvas frame = new TransformacionesCanvas();
            frame.setVisible(true);
        });
    }
}
