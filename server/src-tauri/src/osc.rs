use std::net::UdpSocket;

use rosc::{encoder, OscMessage, OscPacket, OscType};

pub struct Osc {
    address: String,
    port: u16,
    socket: UdpSocket,
}

impl Osc {
    pub fn new(address: String, port: u16) -> Self {
        let socket =
            UdpSocket::bind(format!("{}:0", address)).unwrap();

        Osc {
            address,
            port,
            socket,
        }
    }

    pub fn get_address(&self) -> &str {
        &self.address
    }

    pub fn get_port(&self) -> u16 {
        self.port
    }

    pub fn set_address(&mut self, address: String) {
        self.address = address;
    }

    pub fn set_port(&mut self, port: u16) {
        self.port = port;
    }

    pub fn connect(&self) -> Result<(), String> {
        match self
            .socket
            .connect(format!("{}:{}", self.address, self.port))
        {
            Ok(_) => Ok(()),
            Err(e) => Err(format!("Failed to connect: {}", e)),
        }
    }

    pub fn send_message(&self, address: String, args: Vec<OscType>) {
        let osc_args_for_print = args.clone();
        let address_clone = address.clone();
        let packet = OscPacket::Message(OscMessage {
            addr: address,
            args,
        });

        let message_bytes = match encoder::encode(&packet) {
            Ok(bytes) => bytes,
            Err(e) => {
                eprintln!("Failed to encode OSC message: {}", e);
                return;
            }
        };

        match self
            .socket
            .send_to(&message_bytes, format!("{}:{}", self.address, self.port))
        {
            Ok(_) => {}
            Err(e) => {
                eprintln!("Failed to send OSC message: {}", e);
            }
        }

        println!(
            "Sent OSC message to {}: {}",
            address_clone,
            osc_args_for_print
                .iter()
                .map(|arg| format!("{:?}", arg))
                .collect::<Vec<_>>()
                .join(", ")
        );
    }
}
