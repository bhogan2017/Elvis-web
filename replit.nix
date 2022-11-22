{ pkgs }: {
    deps = [
      pkgs.sudo
      pkgs.python39Packages.pip
      pkgs.nodejs
      pkgs.qtile
      pkgs.nodePackages.vscode-langservers-extracted
      pkgs.nodePackages.typescript-language-server
    ];
  }