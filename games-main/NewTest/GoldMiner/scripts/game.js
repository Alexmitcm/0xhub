var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate =
  $jscomp.ASSUME_ES5 || "function" == typeof Object.create
    ? Object.create
    : function (b) {
        var f = function () {};
        f.prototype = b;
        return new f();
      };
$jscomp.underscoreProtoCanBeSet = function () {
  var b = { a: !0 },
    f = {};
  try {
    return (f.__proto__ = b), f.a;
  } catch (h) {}
  return !1;
};
$jscomp.setPrototypeOf =
  "function" == typeof Object.setPrototypeOf
    ? Object.setPrototypeOf
    : $jscomp.underscoreProtoCanBeSet()
    ? function (b, f) {
        b.__proto__ = f;
        if (b.__proto__ !== f) throw new TypeError(b + " is not extensible");
        return b;
      }
    : null;
$jscomp.inherits = function (b, f) {
  b.prototype = $jscomp.objectCreate(f.prototype);
  b.prototype.constructor = b;
  if ($jscomp.setPrototypeOf) {
    var h = $jscomp.setPrototypeOf;
    h(b, f);
  } else
    for (h in f)
      if ("prototype" != h)
        if (Object.defineProperties) {
          var g = Object.getOwnPropertyDescriptor(f, h);
          g && Object.defineProperty(b, h, g);
        } else b[h] = f[h];
  b.superClass_ = f.prototype;
};
var scroll_y = 0,
  scroll_speed = 3,
  bg,
  is_paused = !0,
  pointer_down = !1,
  cur_pointer,
  Game = function () {
    var b = Phaser.Scene.call(this, "game") || this;
    b.player;
    b.anm_player;
    b.p_anim_state = "idle_left";
    b.limit_left;
    b.limit_right;
    b.move_speed = 350;
    return b;
  };
$jscomp.inherits(Game, Phaser.Scene);
Game.prototype.update = function () {
  0 == is_paused &&
    (this.limit_left.setPosition(5, this.player.y),
    this.limit_right.setPosition(715, this.player.y),
    this.anm_player.setPosition(this.player.x, this.player.y),
    (this.cameras.main.scrollY += scroll_speed),
    (scroll_y = this.cameras.main.scrollY),
    bg && bg.y < scroll_y - config.height && (bg.y = scroll_y),
    pointer_down &&
      cur_pointer &&
      0 == is_paused &&
      (this.player.x < cur_pointer.x - 20 && 200 < cur_pointer.y
        ? "right" != this.p_anim_state &&
          ((this.p_anim_state = "right"),
          this.player.setVelocityX(this.move_speed),
          (this.anm_player.anims.play("walk").scaleX = -1))
        : this.player.x > cur_pointer.x + 20 && 200 < cur_pointer.y
        ? "left" != this.p_anim_state &&
          ((this.p_anim_state = "left"),
          this.player.setVelocityX(-this.move_speed),
          (this.anm_player.anims.play("walk").scaleX = 1))
        : "left" == this.p_anim_state
        ? ((this.p_anim_state = "idle_left"),
          this.player.setVelocityX(0),
          (this.anm_player.anims.play("idle").scaleX = 1))
        : "right" == this.p_anim_state &&
          ((this.p_anim_state = "idle_right"),
          this.player.setVelocityX(0),
          (this.anm_player.anims.play("idle").scaleX = -1)),
      0 > cur_pointer.x || 720 < cur_pointer.x || 1080 < cur_pointer.y)) &&
    ((pointer_down = !1),
    "left" == this.p_anim_state
      ? ((this.p_anim_state = "idle_left"),
        this.player.setVelocityX(0),
        (this.anm_player.anims.play("idle").scaleX = 1))
      : "right" == this.p_anim_state &&
        ((this.p_anim_state = "idle_right"),
        this.player.setVelocityX(0),
        (this.anm_player.anims.play("idle").scaleX = -1)));
};
Game.prototype.create = function () {
  function b() {
    a.time.delayedCall(500, function () {
      if (scroll_y > r) {
        e = "play";
        if ("play" == e) {
          var c = scroll_y + config.height + 200;
          5 > Phaser.Math.Between(0, 10)
            ? (g(Phaser.Math.Between(100, config.width / 2 - 100), c),
              g(
                Phaser.Math.Between(config.width / 2 + 50, config.width - 100),
                c
              ))
            : g(Phaser.Math.Between(100, config.width - 100), c);
          g(Phaser.Math.Between(100, config.width - 100), c + 200);
          6 > Phaser.Math.Between(0, 10)
            ? (g(Phaser.Math.Between(100, config.width / 2 - 100), c + 400),
              g(
                Phaser.Math.Between(config.width / 2 + 50, config.width - 100),
                c + 400
              ))
            : g(Phaser.Math.Between(100, config.width - 100), c + 400);
          g(Phaser.Math.Between(100, config.width - 100), c + 600);
          6 > Phaser.Math.Between(0, 10)
            ? (g(Phaser.Math.Between(100, config.width / 2 - 100), c + 800),
              g(
                Phaser.Math.Between(config.width / 2 + 50, config.width - 100),
                c + 800
              ))
            : g(Phaser.Math.Between(100, config.width - 100), c + 800);
        }
        r = scroll_y + config.height;
        900 >= a.physics.world.gravity.y && (a.physics.world.gravity.y += 8);
        600 >= a.move_speed && (a.move_speed += 4);
        7 >= scroll_speed && (scroll_speed += 0.08);
      }
      b();
    });
  }
  function f() {
    a.time.delayedCall(1e3, function () {
      "play" == e && (k++, t());
      f();
    });
  }
  function h() {
    "play" == e &&
      (d.y <= scroll_y + config.height - 880 ||
        d.y >= scroll_y + config.height + 75) &&
      (play_sound("stab", a),
      a.anm_player.setTexture("dead_player"),
      d.destroy(!0, !0),
      (e = "gameover"),
      (is_paused = !0),
      a.anims.pauseAll(),
      a.physics.pause(),
      a.time.delayedCall(800, function () {
        u();
      }));
  }
  function g(c, b, m) {
    m || (m = Phaser.Math.Between(1, 4));
    var d = a.physics.add
      .staticSprite(c, b, "stone" + m)
      .setOrigin(0.5, 0.3)
      .setDepth(-1);
    4 == m
      ? d.setBodySize(153, 20, !0)
      : 3 == m
      ? d.setBodySize(143, 20, !0)
      : d.setBodySize(123, 20, !0);
    n.add(d);
    50 > Phaser.Math.Between(0, 100)
      ? 100 > Phaser.Math.Between(0, 100) &&
        ((c = a.physics.add.staticSprite(c, b - 80, "coin").setDepth(-1)),
        c.setCircle(25),
        c.anims.play("coin_rotate"),
        p.add(c))
      : 50 < Phaser.Math.Between(0, 100) &&
        60 > Phaser.Math.Between(0, 100) &&
        2 >= l.getLength() &&
        "play" == e &&
        (4 == m
          ? ((c = a.physics.add
              .staticSprite(c - 15, b - 33, "trap")
              .setOrigin(0.4, 0.5)
              .setDepth(-1)
              .setScale(1.2)),
            c.setBodySize(120, 25, !0),
            l.add(c))
          : 3 == m
          ? ((c = a.physics.add
              .staticSprite(c - 8, b - 23, "trap")
              .setOrigin(0.43, 0.6)
              .setDepth(-1)
              .setScale(1.1)),
            c.setBodySize(110, 15, !0),
            l.add(c))
          : ((c = a.physics.add
              .staticSprite(c, b - 15, "trap")
              .setOrigin(0.47, 0.7)
              .setDepth(-1)),
            c.setBodySize(100, 10, !0),
            l.add(c)));
  }
  function t() {
    k > bestscore && (bestscore = k);
    y.setText(k);
    k >= bestscore && save_data(storage_key, bestscore);
  }
  function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const queryArray = queryString.split("&");
    for (let i = 0; i < queryArray.length; i++) {
      const pair = queryArray[i].split("=");
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return params;
  }

  // Function to get wallet address from query parameters
  function getWalletAddressFromQueryParams() {
    const params = getQueryParams();
    if (params.hasOwnProperty("walletaddress")) {
      console.log(params["walletaddress"]);
      return params["walletaddress"];
    } else {
      console.error("Missing walletaddress parameter in the query string");
      return null;
    }
  }
  function u() {
    var isError = false;
    // Console log a text and score
    // console.log("Congratulations! You won the game!");
    // console.log("Your score is: " + 200);

    // Example: var walletAddress = userSession.walletAddress;

    // Determine the amount of coins to send
    var amount = k; // Or any other calculation based on the score
    var apiUrl = "${window.location.origin}/api/coin-system/update";
    // Call the sendCoins function
    if (!isError) {
      const formData = new FormData();
      formData.append("wallet_address", getWalletAddressFromQueryParams());
      formData.append("amount", Math.ceil(k / 140));
      fetch(apiUrl, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          // Check if the content type is JSON, if not, handle it as text
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            return response.text(); // Handle plain text response
          }
        })
        .then((data) => {
          if (typeof data === "string") {
            // Handle non-JSON response
            console.log(`Response: ${data}`);
            // You may need to parse or extract information from the text if needed
          } else {
            // Update the UI with the response data
            document.getElementById(
              "coinsAmountValue"
            ).innerText = `${data.coins}`;
            document.getElementById(
              "todaysPointsValue"
            ).innerText = `${data.todaysPoints}`;
            document.getElementById(
              "levelValueValue"
            ).innerText = `${data.levelValue}`;
            console.log(data.message);
          }
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error
          );
        });
    }

    console.log("Game Over. Final Score:", Math.ceil(k / 140)); // Log the final score
    e = "gameover";
    play_sound("gameover", a);
    k >= bestscore && save_data(storage_key, bestscore);
    var c = a.add
      .rectangle(0, 0, config.width, config.height, 0)
      .setOrigin(0)
      .setScrollFactor(0);
    c.setInteractive();
    c.alpha = 0;
    a.tweens.add({ targets: c, alpha: 0.5, duration: 200 });
    a.add.sprite(360, 540, "popup").setScrollFactor(0);
    a.add.sprite(360, 225, "txt_gameover").setScrollFactor(0);
    a.add.sprite(360, 380, "score_gameover").setScrollFactor(0);
    a.add.sprite(360, 510, "best_score_gameover").setScrollFactor(0);
    a.add
      .text(350, 375, Math.ceil(k / 140), {
        fontFamily: "vanilla",
        fontSize: 35,
        align: "left",
        color: "#4a3d3a",
      })
      .setOrigin(0, 0.5)
      .setScrollFactor(0);
    a.add
      .text(350, 505, bestscore, {
        fontFamily: "vanilla",
        fontSize: 35,
        align: "left",
        color: "#4a3d3a",
      })
      .setOrigin(0, 0.5)
      .setScrollFactor(0);
    // draw_button(360, 630, "restart", a).setScrollFactor(0);
    draw_button(360, 750, "menu", a).setScrollFactor(0);
  }
  var a = this,
    e = "start",
    k = 0,
    v = this.add.group(),
    n = this.add.group(),
    l = this.add.group(),
    p = this.add.group();
  this.cameras.main.setSize(720, 1080);
  bg = this.add.sprite(0, 0, "bg_game").setDepth(-1);
  bg.setOrigin(0);
  this.add.sprite(360, 130, "header_trap").setScrollFactor(0).setDepth(0);
  this.add.sprite(360, 63, "header").setScrollFactor(0).setDepth(0);
  this.add.sprite(150, 63, "bar_score").setScrollFactor(0).setDepth(0);
  this.add.sprite(570, 63, "bar_bestscore").setScrollFactor(0).setDepth(0);
  var y = this.add
    .text(130, 57, k, {
      fontFamily: "vanilla",
      fontSize: 30,
      align: "left",
      color: "#4a3d3a",
    })
    .setOrigin(0, 0.5)
    .setScrollFactor(0)
    .setDepth(0);
  this.add
    .text(555, 55, bestscore, {
      fontFamily: "vanilla",
      fontSize: 30,
      align: "left",
      color: "#4a3d3a",
    })
    .setOrigin(0, 0.5)
    .setScrollFactor(0)
    .setDepth(0);
  draw_button(360, 63, "pause", a).setScrollFactor(0).setDepth(0);
  var d = (this.player = this.physics.add
    .sprite(config.width / 2, 390, "player")
    .setAlpha(0));
  d.setBodySize(40, 120, !0);
  this.anm_player = this.add
    .sprite(config.width / 2, 450, "player")
    .setDepth(0);
  this.physics.world.gravity.y = 0;
  var w = (this.limit_left = this.physics.add
    .sprite(5, 540, "limit")
    .setAlpha(0));
  w.setPushable(!1);
  var x = (this.limit_right = this.physics.add
    .sprite(715, 540, "limit")
    .setAlpha(0));
  x.setPushable(!1);
  var q = this.add.sprite(config.width / 2, config.height / 2, "hand");
  this.tweens.add({
    targets: q,
    scale: 0.9,
    duration: 400,
    ease: "Sine.easeInOut",
    yoyo: !0,
    repeat: -1,
  });
  this.physics.add.collider(d, n);
  this.physics.add.collider(d, w);
  this.physics.add.collider(d, x);
  this.physics.add.collider(d, l, function () {
    "play" == e &&
      (play_sound("stab", a),
      a.anm_player.setTexture("dead_player"),
      d.destroy(!0, !0),
      (e = "gameover"),
      (is_paused = !0),
      a.anims.pauseAll(),
      a.physics.pause(),
      a.time.delayedCall(800, function () {
        u();
      }));
  });
  this.physics.add.overlap(d, p, function (c, b) {
    "play" == e && (play_sound("gold", a), (k += 20), t(), b.destroy(!0, !0));
  });
  this.anims.create({
    key: "idle",
    frames: "idle_player",
    frameRate: 40,
    repeat: -1,
  });
  this.anims.create({
    key: "walk",
    frames: "walk_player",
    frameRate: 40,
    repeat: -1,
  });
  this.anims.create({
    key: "coin_rotate",
    frames: "coin_anm",
    frameRate: 21,
    repeat: -1,
  });
  this.input.keyboard.on("keydown", function (c) {
    "play" == e &&
      ("ArrowLeft" == c.key &&
        0 < d.x &&
        720 > d.x &&
        "left" != a.p_anim_state &&
        ((a.p_anim_state = "left"),
        d.setVelocityX(-a.move_speed),
        (a.anm_player.anims.play("walk").scaleX = 1)),
      "ArrowRight" == c.key &&
        720 > d.x &&
        0 < d.x &&
        "right" != a.p_anim_state &&
        ((a.p_anim_state = "right"),
        d.setVelocityX(a.move_speed),
        (a.anm_player.anims.play("walk").scaleX = -1)));
    "start" == e &&
      ((e = "play"),
      (is_paused = !1),
      q.destroy(!0, !0),
      a.anims.resumeAll(),
      (a.physics.world.gravity.y = 350),
      a.anm_player.anims.play("idle"));
  });
  this.input.keyboard.on("keyup", function (c) {
    "play" == e &&
      ("left" == a.p_anim_state
        ? ((a.p_anim_state = "idle_left"),
          d.setVelocityX(0),
          (a.anm_player.anims.play("idle").scaleX = 1))
        : "right" == a.p_anim_state &&
          ((a.p_anim_state = "idle_right"),
          d.setVelocityX(0),
          (a.anm_player.anims.play("idle").scaleX = -1)));
  });
  this.input.on(
    "pointermove",
    function (a) {
      "play" == e && pointer_down && (cur_pointer = a);
    },
    this
  );
  this.input.on(
    "pointerdown",
    function (c) {
      "play" == e && (pointer_down = !0);
      "start" == e &&
        150 < c.y &&
        ((e = "play"),
        (is_paused = !1),
        q.destroy(!0, !0),
        a.anims.resumeAll(),
        (a.physics.world.gravity.y = 350),
        a.anm_player.anims.play("idle"));
    },
    this
  );
  this.input.on(
    "pointerup",
    function (c) {
      pointer_down = !1;
      "play" == e &&
        ("left" == this.p_anim_state
          ? ((this.p_anim_state = "idle_left"),
            d.setVelocityX(0),
            (a.anm_player.anims.play("idle").scaleX = 1))
          : "right" == this.p_anim_state &&
            ((this.p_anim_state = "idle_right"),
            d.setVelocityX(0),
            (a.anm_player.anims.play("idle").scaleX = -1)));
    },
    this
  );
  this.ready = !0;
  this.input.on(
    "gameobjectdown",
    function (c, b) {
      "start" != e &&
        b.button &&
        (play_sound("click", a),
        a.tweens.add({
          targets: b,
          scaleX: 0.95,
          scaleY: 0.95,
          yoyo: !0,
          duration: 100,
          ease: "Linear",
          onComplete: function () {
            if ("play" === e) {
              if ("pause" === b.name) {
                e = "paused";
                is_paused = !0;
                a.anims.pauseAll();
                a.physics.pause();
                var c = a.add
                  .rectangle(0, 0, config.width, config.height, 0)
                  .setOrigin(0)
                  .setScrollFactor(0);
                c.setInteractive();
                c.alpha = 0;
                a.tweens.add({ targets: c, alpha: 0.5, duration: 200 });
                var d = a.add.sprite(360, 540, "popup").setScrollFactor(0),
                  f = a.add.sprite(360, 225, "txt_paused").setScrollFactor(0),
                  g = draw_button(360, 390, "resume", a).setScrollFactor(0),
                  h = draw_button(360, 510, "sound_on", a).setScrollFactor(0),
                  k = draw_button(360, 630, "restart", a).setScrollFactor(0),
                  l = draw_button(360, 750, "menu", a).setScrollFactor(0);
                check_audio(h);
                v.addMultiple([c, d, f, h, g, k, l]);
              }
            } else if ("resume" === b.name || "close" === b.name)
              (e = "play"),
                (is_paused = !1),
                v.clear(!0, !0),
                a.anims.resumeAll(),
                a.physics.resume();
            "sound" === b.name
              ? switch_audio(b)
              : "restart" === b.name
              ? ((e = "start"),
                (a.p_anim_state = "idle_left"),
                (is_paused = !0),
                (scroll_y = 0),
                (scroll_speed = 3),
                (a.move_speed = 350),
                a.anims.resumeAll(),
                a.scene.restart())
              : "menu" === b.name &&
                ((e = "start"),
                (a.p_anim_state = "idle_left"),
                (scroll_y = 0),
                (scroll_speed = 3),
                (a.move_speed = 350),
                (is_paused = !0),
                a.anims.resumeAll(),
                a.scene.start("menu"));
          },
        }));
    },
    this
  );
  a.time.addEvent({
    delay: 50,
    loop: !0,
    callback: function () {
      if ("play" == e) {
        h();
        var a = n.getLength(),
          b = n.getChildren();
        for (--a; 0 <= a; a--) {
          var d = b[a];
          d.y <= scroll_y + config.height - 1e3 && d.destroy(!0, !0);
        }
        a = l.getLength();
        b = l.getChildren();
        for (--a; 0 <= a; a--)
          (d = b[a]),
            d.y <= scroll_y + config.height - 1e3 && d.destroy(!0, !0);
        a = p.getLength();
        b = p.getChildren();
        for (--a; 0 <= a; a--)
          (d = b[a]),
            d.y <= scroll_y + config.height - 1e3 && d.destroy(!0, !0);
      }
    },
  });
  g(Phaser.Math.Between(100, config.width / 2 - 100), 800);
  g(Phaser.Math.Between(config.width / 2 + 50, config.width - 100), 800);
  g(config.width / 2, 1100);
  b();
  var r = 0;
  f();
  a.anims.pauseAll();
};
var config = {
    type: Phaser.AUTO,
    width: 720,
    height: 1080,
    scale: {
      mode: Phaser.Scale.FIT,
      parent: "game_content",
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: { default: "arcade", arcade: { debug: !1 } },
    scene: [Boot, Load, Menu, Game],
  },
  game = new Phaser.Game(config);
